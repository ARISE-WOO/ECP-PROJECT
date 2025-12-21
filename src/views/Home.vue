<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/Header.vue'
import NetworksSection from '@/components/NetworksSection.vue'
import HowItWorks from '@/components/HowItWorks.vue'
import CTA from '@/components/CTA.vue'
import Footer from '@/components/Footer.vue'
import OnboardingModal from '@/components/OnboardingModal.vue'

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
    <Header :scrolled="scrolled" @open-modal="showModal = true" />
    
    <main class="main-content">
      <NetworksSection id="home" @open-modal="showModal = true" />
      <Features id="features" />
      <HowItWorks id="how-it-works" />
      <CTA id="benefits" @open-modal="showModal = true" />
    </main>

    <Footer />

    <Transition name="modal-fade">
      <OnboardingModal v-if="showModal" @close="showModal = false" />
    </Transition>
  </div>
</template>

<style scoped>
.main-content {
  padding-top: 90px;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>