<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Sparkles, CalendarDays, MessageCircleCode, ShieldCheck, Rocket } from 'lucide-vue-next'

const activeFeature = ref(0)
let timer = null

const features = [
  { 
    icon: Sparkles, 
    title: 'IA Créative & Inspirée', 
    description: 'Dites adieu au syndrome de la page blanche. Notre IA génère des posts percutants qui capturent l’essence de votre marque en un clin d’œil.', 
    color: '#6F2DBD' 
  },
  { 
    icon: CalendarDays, 
    title: 'Le Pilote Automatique', 
    description: 'Programmez vos contenus sur LinkedIn et Facebook en toute sérénité. Vous gardez le contrôle final, l’assistant s’occupe de la ponctualité.', 
    color: '#E91E8C' 
  },
  { 
    icon: MessageCircleCode, 
    title: 'Écoute Active 24h/7', 
    description: 'Ne manquez plus jamais une interaction. L’assistant veille sur vos commentaires et engage votre communauté pour booster l’algorithme.', 
    color: '#3d3f8f' 
  },
  { 
    icon: ShieldCheck, 
    title: 'Forteresse de Données', 
    description: 'Votre stratégie est un secret bien gardé. Hébergé localement, l’assistant garantit que vos données ne sortent jamais de chez vous.', 
    color: '#10b981' 
  }
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
  clearInterval(timer)
  startTimer()
}
</script>

<template>
  <section id="features" class="features-section">
    <div class="container">
      <h2 class="section-title">
        Votre temps est <span class="text-gradient">précieux</span>
      </h2>
      <p class="section-subtitle">
        L'assistant intelligent qui travaille quand vous dormez, la sécurité en plus.
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
          <div class="hover-bg"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 100px 2rem;
  background: #f9fafb;
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
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2.5rem;
  border-radius: 24px;
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
  border-color: var(--accent-color);
}

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

.feature-content {
  position: relative;
  z-index: 1;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: #f8fafc;
  border-radius: 16px;
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
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .section-subtitle {
    font-size: 1.1rem;
  }
  .feature-card {
    padding: 2rem;
  }
}
</style>
