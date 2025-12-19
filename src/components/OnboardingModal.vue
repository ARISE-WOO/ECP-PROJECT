<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { supabase } from '../supabase' // Vérifiez que ce fichier existe
import { 
  Building2, Globe, MapPin, Clock, Users, MessageSquare, 
  Linkedin, Facebook, Instagram, ChevronRight, ChevronLeft, CheckCircle2 
} from 'lucide-vue-next'

const emit = defineEmits(['close'])
const currentStep = ref(0)
const showErrors = ref(false)
const telegramId = ref(null)

onMounted(() => {
  // Récupération du Telegram ID dans l'URL
  const params = new URLSearchParams(window.location.search)
  telegramId.value = params.get('tid')
})

const formData = reactive({
  companyName: '',
  sector: '',
  location: '',
  openingHours: '',
  targetAudience: '',
  tone: 'Professionnel',
  networks: []
})

const formSteps = [
  {
    title: 'Identité de marque',
    subtitle: 'Présentez votre entreprise pour une IA personnalisée.',
    fields: [
      { name: 'companyName', label: 'Nom de l\'entreprise', type: 'text', icon: Building2, placeholder: 'Ex: ECP Studio' },
      { name: 'sector', label: 'Secteur d\'activité', type: 'text', icon: Globe, placeholder: 'Ex: Immobilier, Tech...' }
    ]
  },
  {
    title: 'Présence Locale',
    subtitle: 'Optimisez vos publications selon votre zone.',
    fields: [
      { name: 'location', label: 'Localisation', type: 'text', icon: MapPin, placeholder: 'Ex: Paris, France' },
      { name: 'openingHours', label: 'Horaires', type: 'text', icon: Clock, placeholder: 'Ex: Lun-Ven 9h-18h' }
    ]
  },
  {
    title: 'Stratégie Editoriale',
    subtitle: 'Définissez comment votre assistant doit s\'exprimer.',
    fields: [
      { name: 'targetAudience', label: 'Public cible', type: 'text', icon: Users, placeholder: 'Ex: Jeunes entrepreneurs' },
      { name: 'tone', label: 'Tonalité', type: 'select', icon: MessageSquare, options: ['Professionnel', 'Décontracté', 'Créatif', 'Informatif'] }
    ]
  },
  {
    title: 'Canaux de diffusion',
    subtitle: 'Où souhaitez-vous que l\'IA publie ?',
    isNetworks: true
  }
]

const socialNetworks = [
  { name: 'LinkedIn', icon: Linkedin, color: '#0077b5', provider: 'linkedin_oidc' },
  { name: 'Facebook', icon: Facebook, color: '#1877f2', provider: 'facebook' },
  { name: 'Instagram', icon: Instagram, color: '#e4405f', provider: 'instagram' },
]

const isStepValid = computed(() => {
  const step = formSteps[currentStep.value]
  if (step.isNetworks) return formData.networks.length > 0
  return step.fields.every(field => formData[field.name]?.toString().trim() !== '')
})

// Déclenche l'authentification OAuth Supabase
const connectSocial = async (network) => {
  // Sauvegarde temporaire des infos du formulaire
  localStorage.setItem('tg_id', telegramId.value)
  localStorage.setItem('onboarding_data', JSON.stringify(formData))

  const { error } = await supabase.auth.signInWithOAuth({
    provider: network.provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' }
    }
  })
  if (error) alert("Erreur de connexion : " + error.message)
}

const nextStep = () => {
  if (isStepValid.value) {
    showErrors.value = false
    currentStep.value < formSteps.length - 1 ? currentStep.value++ : completeSetup()
  } else {
    showErrors.value = true
  }
}

const previousStep = () => {
  showErrors.value = false
  currentStep.value > 0 ? currentStep.value-- : emit('close')
}

const completeSetup = () => {
  console.log('Finalisation...', formData)
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="hero-modal">
      <div class="modal-sidebar">
        <div class="step-indicator">
          <div v-for="(step, i) in formSteps" :key="i" 
               class="step-dot" :class="{ active: i <= currentStep }">
          </div>
        </div>
      </div>

      <div class="modal-content">
        <header class="content-header">
          <div class="header-text">
            <h2>{{ formSteps[currentStep].title }}</h2>
            <p>{{ formSteps[currentStep].subtitle }}</p>
          </div>
          <button class="close-btn" @click="emit('close')">×</button>
        </header>

        <main class="content-body">
          <!-- Correction ici : Le bloc v-if et v-else sont bien adjacents -->
          <div v-if="!formSteps[currentStep].isNetworks" class="form-grid">
            <div v-for="field in formSteps[currentStep].fields" :key="field.name" class="input-wrapper">
              <label :class="{ 'label-error': showErrors && !formData[field.name] }">
                <component :is="field.icon" :size="16" /> {{ field.label }}
              </label>
              <select v-if="field.type === 'select'" v-model="formData[field.name]" class="hero-input">
                <option v-for="opt in field.options" :key="opt">{{ opt }}</option>
              </select>
              <input v-else v-model="formData[field.name]" :type="field.type" 
                     :placeholder="field.placeholder" 
                     class="hero-input"
                     :class="{ 'input-invalid': showErrors && !formData[field.name] }">
            </div>
          </div>

          <div v-else class="networks-selection">
            <div v-for="net in socialNetworks" :key="net.name" 
                 class="net-card" 
                 @click="connectSocial(net)">
              <div class="net-icon-box" :style="{ backgroundColor: net.color + '15', color: net.color }">
                <component :is="net.icon" :size="24" />
              </div>
              <div class="net-info">
                <span class="net-name">{{ net.name }}</span>
                <span class="net-status">Cliquer pour connecter</span>
              </div>
              <CheckCircle2 v-if="formData.networks.includes(net.name)" class="check-icon" :size="20" />
            </div>
          </div>
        </main>

        <footer class="content-footer">
          <button class="btn-back" @click="previousStep">
            <ChevronLeft :size="18" /> {{ currentStep === 0 ? 'Annuler' : 'Retour' }}
          </button>
          <button class="btn-next" :class="{ 'btn-disabled': !isStepValid }" @click="nextStep">
            {{ currentStep === formSteps.length - 1 ? 'Terminer' : 'Continuer' }} <ChevronRight :size="18" />
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Conservez votre style précédent ici */
.net-info { display: flex; flex-direction: column; }
.net-status { font-size: 11px; color: #64748b; }
.net-name { font-weight: 600; color: #1e293b; }
.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.hero-modal { display: flex; background: white; width: 900px; max-width: 95vw; height: 580px; border-radius: 24px; overflow: hidden; }
.modal-sidebar { width: 80px; background: #0f172a; display: flex; flex-direction: column; align-items: center; padding-top: 40px; }
.step-dot { width: 4px; height: 40px; background: #334155; margin-bottom: 8px; border-radius: 2px; }
.step-dot.active { background: #E91E8C; }
.modal-content { flex: 1; display: flex; flex-direction: column; padding: 40px; }
.content-header { display: flex; justify-content: space-between; margin-bottom: 40px; }
.hero-input { width: 100%; padding: 14px 16px; border: 2px solid #f1f5f9; border-radius: 12px; margin-bottom: 10px; }
.networks-selection { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.net-card { display: flex; align-items: center; padding: 20px; border: 2px solid #f1f5f9; border-radius: 16px; cursor: pointer; transition: 0.2s; }
.net-card:hover { border-color: #E91E8C; background: #fff1f7; }
.net-icon-box { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; }
.content-footer { margin-top: auto; display: flex; justify-content: space-between; padding-top: 20px; }
.btn-next { background: #E91E8C; color: white; border: none; padding: 12px 24px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
.btn-back { background: none; border: none; color: #64748b; cursor: pointer; display: flex; align-items: center; gap: 8px; }
</style>
