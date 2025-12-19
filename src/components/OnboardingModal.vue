<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['close'])

const currentStep = ref(0)
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
    title: 'Informations de l\'entreprise',
    fields: [
      { name: 'companyName', label: 'Nom de votre entreprise', type: 'text', icon: '🏢' },
      { name: 'sector', label: 'Secteur d\'activité', type: 'text', icon: '🌍' }
    ]
  },
  {
    title: 'Localisation & Horaires',
    fields: [
      { name: 'location', label: 'Localisation', type: 'text', icon: '📍' },
      { name: 'openingHours', label: 'Heures d\'ouverture', type: 'text', placeholder: 'Ex: Lun-Ven 9h-18h', icon: '🕐' }
    ]
  },
  {
    title: 'Audience & Communication',
    fields: [
      { name: 'targetAudience', label: 'Public cible', type: 'text', icon: '👥' },
      { name: 'tone', label: 'Tonalité', type: 'select', options: ['Professionnel', 'Décontracté', 'Créatif', 'Informatif'], icon: '💬' }
    ]
  },
  {
    title: 'Réseaux Sociaux',
    isNetworks: true
  }
]

const networks = [
  { name: 'LinkedIn', class: 'network-linkedin' },
  { name: 'Facebook', class: 'network-facebook' },
  { name: 'Instagram', class: 'network-instagram' },
  { name: 'X (Twitter)', class: 'network-twitter' }
]

const toggleNetwork = (network) => {
  const index = formData.networks.indexOf(network)
  if (index > -1) {
    formData.networks.splice(index, 1)
  } else {
    formData.networks.push(network)
  }
}

const nextStep = () => {
  if (currentStep.value < formSteps.length - 1) {
    currentStep.value++
  } else {
    completeSetup()
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  } else {
    emit('close')
  }
}

const completeSetup = () => {
  // Validation
  if (formData.networks.length === 0) {
    alert('⚠️ Veuillez sélectionner au moins un réseau social')
    return
  }

  // Afficher les données dans la console
  console.log('📊 Configuration ECP Assistant:', {
    ...formData,
    timestamp: new Date().toISOString()
  })

  // Sauvegarder dans localStorage
  try {
    localStorage.setItem('ecp_assistant_config', JSON.stringify(formData))
  } catch (error) {
    console.warn('Impossible de sauvegarder dans localStorage:', error)
  }

  // Message de succès
  const message = `
✅ Configuration terminée avec succès !

📋 Récapitulatif :
━━━━━━━━━━━━━━━━━━━━━━━
🏢 Entreprise : ${formData.companyName || 'Non renseigné'}
🌍 Secteur : ${formData.sector || 'Non renseigné'}
📍 Localisation : ${formData.location || 'Non renseigné'}
🕐 Horaires : ${formData.openingHours || 'Non renseigné'}
👥 Public cible : ${formData.targetAudience || 'Non renseigné'}
💬 Tonalité : ${formData.tone}
📱 Réseaux : ${formData.networks.join(', ')}

🚀 Votre assistant ECP est prêt à être déployé !
  `.trim()

  alert(message)

  // Fermer le modal et réinitialiser
  emit('close')
  setTimeout(() => {
    currentStep.value = 0
  }, 300)
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <button class="modal-close" @click="emit('close')" title="Fermer">✕</button>
      
      <div class="modal-header">
        <h3>Configuration de votre Assistant</h3>
        <p>Étape {{ currentStep + 1 }} sur {{ formSteps.length }}</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: ((currentStep + 1) / formSteps.length * 100) + '%' }"></div>
        </div>
      </div>

      <div class="modal-body">
        <h4>{{ formSteps[currentStep].title }}</h4>
        
        <!-- Network Selection -->
        <div v-if="formSteps[currentStep].isNetworks">
          <p style="color: #666; margin-bottom: 1.5rem;">
            Sélectionnez les réseaux sociaux que vous souhaitez gérer :
          </p>
          <div class="networks-grid">
            <div 
              v-for="network in networks" 
              :key="network.name"
              class="network-card"
              :class="{ selected: formData.networks.includes(network.name) }"
              @click="toggleNetwork(network.name)"
            >
              <div class="network-icon" :class="network.class"></div>
              <div style="font-weight: 600;">{{ network.name }}</div>
              <div v-if="formData.networks.includes(network.name)" class="check-mark">✓</div>
            </div>
          </div>
          <p v-if="formData.networks.length === 0" class="warning-text">
            ⚠️ Veuillez sélectionner au moins un réseau social
          </p>
          <p v-else class="success-text">
            ✓ {{ formData.networks.length }} réseau{{ formData.networks.length > 1 ? 'x' : '' }} sélectionné{{ formData.networks.length > 1 ? 's' : '' }}
          </p>
        </div>

        <!-- Form Fields -->
        <div v-else>
          <div v-for="field in formSteps[currentStep].fields" :key="field.name" class="form-group">
            <label class="form-label">
              <span>{{ field.icon }}</span> {{ field.label }}
            </label>
            <select 
              v-if="field.type === 'select'" 
              v-model="formData[field.name]" 
              class="form-select"
            >
              <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <input 
              v-else 
              v-model="formData[field.name]" 
              :type="field.type" 
              :placeholder="field.placeholder" 
              class="form-input"
            >
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="previousStep">
          {{ currentStep === 0 ? 'Annuler' : '← Précédent' }}
        </button>
        <button class="btn btn-primary" @click="nextStep">
          {{ currentStep === formSteps.length - 1 ? 'Terminer ✓' : 'Suivant →' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal Container */
.modal {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Close Button */
.modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: #f5f5f5;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
}

.modal-close:hover {
  background: #ff4785;
  color: white;
  transform: rotate(90deg);
}

/* Modal Header */
.modal-header {
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.modal-header h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #3d3f8f;
  margin-bottom: 0.5rem;
  padding-right: 2.5rem;
}

.modal-header p {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

/* Progress Bar */
.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #3d3f8f, #ff4785);
  transition: width 0.4s ease;
  border-radius: 4px;
}

/* Modal Body */
.modal-body {
  padding: 2rem;
}

.modal-body h4 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #3d3f8f;
  margin-bottom: 1.5rem;
}

/* Form Groups */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-label span {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #ff4785;
  box-shadow: 0 0 0 3px rgba(255, 71, 133, 0.1);
}

/* Networks Grid */
.networks-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.network-card {
  padding: 1.25rem;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

.network-card:hover {
  border-color: #ff4785;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 71, 133, 0.2);
}

.network-card.selected {
  border-color: #ff4785;
  background: rgba(255, 71, 133, 0.05);
}

.network-icon {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.network-linkedin { background: #0077B5; }
.network-facebook { background: #1877F2; }
.network-instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743); }
.network-twitter { background: #000000; }

.check-mark {
  margin-left: auto;
  color: #ff4785;
  font-size: 1.4rem;
  font-weight: bold;
}

.warning-text {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.success-text {
  color: #51cf66;
  font-size: 0.9rem;
  margin-top: 1rem;
  font-weight: 600;
}

/* Modal Footer */
.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e5e5;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  background: #fafafa;
  border-radius: 0 0 20px 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .modal {
    max-width: 95%;
    margin: 0.5rem;
  }

  .networks-grid {
    grid-template-columns: 1fr;
  }

  .modal-header h3 {
    font-size: 1.4rem;
  }
}
</style>