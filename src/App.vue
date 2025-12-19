<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './components/Header.vue'
import NetworksSection from './components/NetworksSection.vue'
import Features from './components/Features.vue'
import HowItWorks from './components/HowItWorks.vue'
import CTA from './components/CTA.vue'
import Footer from './components/Footer.vue'
import OnboardingModal from './components/OnboardingModal.vue'

const scrolled = ref(false)
const showModal = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="app-container">
    <!-- Header avec prop scrolled et événement pour la modal -->
    <Header :scrolled="scrolled" @open-modal="showModal = true" />
    
    <main class="main-content">
      <!-- Ajout d'IDs pour la navigation fluide -->
      <NetworksSection id="home" />
      <Features id="features" />
      <HowItWorks id="how-it-works" />
      <CTA id="benefits" @open-modal="showModal = true" />
    </main>

    <Footer />

    <!-- Modal avec transition fluide -->
    <Transition name="modal-fade">
      <OnboardingModal v-if="showModal" @close="showModal = false" />
    </Transition>
  </div>
</template>

<style>
/* --- Reset & Base 2025 --- */
:root {
  scroll-behavior: smooth;
  --header-height: 90px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #ffffff;
  color: #0f172a;
  overflow-x: hidden;
}

/* --- Correction de l'espacement Header/Contenu --- */
.main-content {
  /* On crée un espace vide en haut égal à la hauteur du header */
  padding-top: var(--header-height);
}

/* --- Espacement entre les sections --- */
section {
  padding: 100px 24px;
}

@media (max-width: 768px) {
  :root { --header-height: 70px; }
  section { padding: 60px 20px; }
}

/* --- Animations de la Modal --- */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Scrollbar stylisée aux couleurs du projet */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(#6F2DBD, #E91E8C);
  border-radius: 10px;
}
</style>
