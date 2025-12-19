<script setup>
import { ref } from 'vue'
import { Menu, X, Sparkles } from 'lucide-vue-next'

defineProps({
  scrolled: Boolean
})

const emit = defineEmits(['open-modal'])
const isMobileMenuOpen = ref(false)

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="header" :class="{ scrolled, 'mobile-open': isMobileMenuOpen }">
    <div class="header-container">
      <!-- Logo -->
      <a href="#" class="logo">
        <div class="logo-icon">
          <Sparkles :size="20" fill="white" />
        </div>
        <span class="logo-text">ECP<span class="text-gradient">Assistant</span></span>
      </a>

      <!-- Desktop Nav -->
      <nav class="nav-desktop">
        <a href="#features">Fonctionnalités</a>
        <a href="#how-it-works">Comment ça marche</a>
        <a href="#benefits">Avantages</a>
      </nav>

      <!-- CTA & Mobile Toggle -->
      <div class="header-actions">
        <button class="btn-nav-primary" @click="emit('open-modal')">
          Démarrer
        </button>
        
        <button class="menu-toggle" @click="toggleMenu">
          <Menu v-if="!isMobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Nav Overlay -->
    <transition name="slide">
      <nav v-if="isMobileMenuOpen" class="nav-mobile">
        <a href="#features" @click="toggleMenu">Fonctionnalités</a>
        <a href="#how-it-works" @click="toggleMenu">Comment ça marche</a>
        <a href="#benefits" @click="toggleMenu">Avantages</a>
        <button class="btn-mobile-cta" @click="emit('open-modal'); toggleMenu()">
          Démarrer maintenant
        </button>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1rem 0;
}

/* Effet au scroll : Devient une barre flottante élégante */
.header.scrolled {
  padding: 0.75rem 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(111, 45, 189, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  z-index: 2100;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 16px rgba(111, 45, 189, 0.2);
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
}

.text-gradient {
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* NAV DESKTOP */
.nav-desktop {
  display: flex;
  gap: 2.5rem;
}

.nav-desktop a {
  color: #475569;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  transition: 0.3s;
  position: relative;
}

.nav-desktop a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #E91E8C;
  transition: 0.3s;
}

.nav-desktop a:hover { color: #0f172a; }
.nav-desktop a:hover::after { width: 100%; }

/* ACTIONS */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-nav-primary {
  background: #0f172a;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.btn-nav-primary:hover {
  background: #6F2DBD;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(111, 45, 189, 0.2);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #0f172a;
  cursor: pointer;
  z-index: 2100;
}

/* NAV MOBILE */
.nav-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 2050;
  padding: 2rem;
}

.nav-mobile a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  text-decoration: none;
}

.btn-mobile-cta {
  width: 100%;
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  color: white;
  padding: 1.2rem;
  border-radius: 15px;
  border: none;
  font-weight: 800;
  font-size: 1.1rem;
}

/* RESPONSIVE */
@media (max-width: 968px) {
  .nav-desktop { display: none; }
  .menu-toggle { display: block; }
  .btn-nav-primary { display: none; } /* On le cache sur mobile au profit du bouton dans le menu */
}

/* ANIMATIONS */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-100%);
}
</style>
