<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
// import Hero from './components/Hero.vue'  // ← Commentez cette ligne
import Features from './components/Features.vue'
import NetworksSection from './components/NetworksSection.vue'
import HowItWorks from './components/HowItWorks.vue'
import CTA from './components/CTA.vue'
import Footer from './components/Footer.vue'
import OnboardingModal from './components/OnboardingModal.vue'

const scrolled = ref(false)
const showModal = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <div class="app">
    <Header :scrolled="scrolled" @open-modal="showModal = true" />
    <!-- <Hero @open-modal="showModal = true" /> ← Commentez cette ligne -->
    <NetworksSection />
    <Features />
    <HowItWorks />
    <CTA @open-modal="showModal = true" />
    <Footer />
    <OnboardingModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<style>
#app {
  overflow-x: hidden;
}
</style>