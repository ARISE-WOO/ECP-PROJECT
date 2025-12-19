<script setup>
const steps = [
  { icon: '🏢', title: 'Configuration', description: 'Renseignez votre identité d\'entreprise, votre secteur et votre tonalité via une interface simple' },
  { icon: '✨', title: 'Génération & Validation', description: 'L\'IA génère du contenu adapté. Vous validez ou régénérez avant publication' },
  { icon: '📊', title: 'Monitoring Automatique', description: 'Le système surveille les réactions et répond automatiquement selon l\'analyse de sentiment' }
]
</script>

<template>
  <section id="how-it-works" class="how-it-works">
    <h2 class="section-title">Comment ça marche ?</h2>
    <p class="section-subtitle">Simple, rapide et efficace en 3 étapes</p>
    <div class="steps-grid">
      <div v-for="(step, i) in steps" :key="i" class="step-card">
        <div class="step-number">{{ i + 1 }}</div>
        <div class="step-icon">{{ step.icon }}</div>
        <h3 class="step-title">{{ step.title }}</h3>
        <p class="step-desc">{{ step.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-it-works {
  padding: 6rem 2rem;
  background: #F5F5F5;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  font-size: 1.25rem;
  color: #4A4A4A;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.steps-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.step-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(61, 63, 143, 0.15);
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3d3f8f, #ff4785);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.step-icon {
  font-size: 2rem;
  color: #3d3f8f;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.step-desc {
  color: #4A4A4A;
}
</style>