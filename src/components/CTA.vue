<script setup>
const emit = defineEmits(['open-modal'])
</script>

<template>
  <section class="cta">
    <h2>Prêt à automatiser votre Community Management ?</h2>
    <p>Commencez gratuitement et transformez votre présence sur les réseaux sociaux</p>
    <button class="btn btn-secondary" @click="emit('open-modal')">
      Configurer mon Assistant Maintenant →
    </button>
  </section>
</template>

<style scoped>
.cta {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  color: white;
  text-align: center;
}

.cta h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.cta p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .cta h2 { font-size: 2rem; }
}
</style>