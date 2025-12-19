<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// Import des icônes professionnelles pour le style SaaS
import { Sparkles, CalendarDays, MessageCircleCode, ShieldCheck } from 'lucide-vue-next'

const activeFeature = ref(0)
let timer = null // Référence pour gérer le timer proprement

const features = [
  { icon: Sparkles, title: 'Génération de Contenu IA', description: 'Créez du contenu engageant adapté à votre marque grâce à Mistral AI hébergé localement.', color: '#6F2DBD' },
  { icon: CalendarDays, title: 'Publication Automatisée', description: 'Planifiez et publiez sur LinkedIn, Facebook et plus encore avec validation humaine.', color: '#E91E8C' },
  { icon: MessageCircleCode, title: 'Monitoring Intelligent', description: 'Suivez et répondez automatiquement aux interactions sur vos réseaux sociaux.', color: '#3d3f8f' },
  { icon: ShieldCheck, title: 'Souveraineté des Données', description: '100% local, sans dépendance cloud. Vos données restent sous votre contrôle.', color: '#10b981' }
]

const startTimer = () => {
  timer = setInterval(() => {
    activeFeature.value = (activeFeature.value + 1) % features.length
  }, 4000)
}

onMounted(() => startTimer())

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const setActive = (index) => {
  activeFeature.value = index
  clearInterval(timer) // Stop le timer quand l'utilisateur interagit
  startTimer() // Redémarre le timer
}
</script>

<template>
  <section id="features" class="features-section">
    <div class="container">
      <h2 class="section-title">
        Une Solution <span class="text-gradient">Tout-en-Un</span>
      </h2>
      <p class="section-subtitle">
        Orchestrez votre stratégie social media avec une IA générative souveraine
      </p>
      
      <div class="features-grid">
        <div 
          v-for="(feature, i) in features" 
          :key="i"
          class="feature-card"
          :class="{ active: activeFeature === i }"
          @mouseenter="setActive(i)"
          :style="{ '--accent-color': feature.color }"
        >
          <div class="feature-content">
            <div class="icon-wrapper">
              <component :is="feature.icon" :size="32" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
          <!-- Effet de survol visuellement propre -->
          <div class="hover-bg"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 100px 2rem; /* Espacement unifié comme dans App.vue */
  background: #f9fafb; /* Fond très léger */
}

.container { max-width: 1280px; margin: auto; }

.section-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  text-align: center;
  margin-bottom: 1rem;
  color: #0f172a;
}

.text-gradient {
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto 4rem; /* Plus d'espace avant les cartes */
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2.5rem;
  border-radius: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-card:hover, .feature-card.active {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  border-color: var(--accent-color); /* Bordure colorée active */
}

/* Effet de fond coloré au survol/actif */
.hover-bg {
  position: absolute;
  inset: 0;
  background-color: var(--accent-color);
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 0;
}

.feature-card:hover .hover-bg, .feature-card.active .hover-bg {
  opacity: 0.05;
}

/* Contenu et Icones */
.feature-content {
  position: relative;
  z-index: 1;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: #f8fafc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.feature-title {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: #0f172a;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .section-subtitle {
    font-size: 1rem;
  }
  .feature-card {
    padding: 2rem;
  }
}
</style>
