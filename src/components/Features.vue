<script setup>
import { ref, onMounted } from 'vue'

const activeFeature = ref(0)

const features = [
  { icon: '✨', title: 'Génération de Contenu IA', description: 'Créez du contenu engageant adapté à votre marque grâce à Mistral AI hébergé localement' },
  { icon: '📅', title: 'Publication Automatisée', description: 'Planifiez et publiez sur LinkedIn, Facebook et plus encore avec validation humaine' },
  { icon: '💬', title: 'Monitoring Intelligent', description: 'Suivez et répondez automatiquement aux interactions sur vos réseaux sociaux' },
  { icon: '🛡️', title: 'Souveraineté des Données', description: '100% local, sans dépendance cloud. Vos données restent sous votre contrôle' }
]

onMounted(() => {
  setInterval(() => {
    activeFeature.value = (activeFeature.value + 1) % features.length
  }, 4000)
})
</script>

<template>
  <section id="features" class="features">
    <h2 class="section-title">
      Une Solution <span class="highlight">Tout-en-Un</span>
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
        @mouseenter="activeFeature = i"
      >
        <div class="feature-content">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 6rem 2rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
}

.highlight {
  background: linear-gradient(135deg, #3d3f8f, #ff4785);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  font-size: 1.25rem;
  color: #4A4A4A;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.features-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 20px;
  background: #F5F5F5;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #3d3f8f, #ff4785);
  opacity: 0;
  transition: opacity 0.3s;
}

.feature-card:hover::before,
.feature-card.active::before {
  opacity: 1;
}

.feature-card:hover,
.feature-card.active {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(61, 63, 143, 0.2);
}

.feature-content {
  position: relative;
  z-index: 1;
}

.feature-card:hover .feature-content,
.feature-card.active .feature-content {
  color: white;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
</style>