<script setup>
defineProps({
  scrolled: Boolean
})

const emit = defineEmits(['open-modal'])
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <div class="header-container">
      <a href="#" class="logo">
        <div class="logo-icon">⚡</div>
        <span>ECP Assistant</span>
      </a>

      <nav class="nav">
        <a href="#features">Fonctionnalités</a>
        <a href="#how-it-works">Comment ça marche</a>
        <a href="#benefits">Avantages</a>
      </nav>

      <button class="btn btn-primary" @click="emit('open-modal')">
        Démarrer
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(111, 45, 189, 0.1);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6F2DBD;
  text-decoration: none;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.4rem;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  color: #333;
  font-weight: 500;
  text-decoration: none;
}

.nav a:hover {
  color: #6F2DBD;
}
</style>
