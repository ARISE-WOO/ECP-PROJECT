<script setup>
import { Linkedin, Instagram, Facebook, Sparkles, ArrowRight } from 'lucide-vue-next'

const networks = [
  { name: 'LinkedIn', color: '#0077B5', icon: Linkedin },
  { name: 'Instagram', color: '#E4405F', icon: Instagram },
  { name: 'Facebook', color: '#1877F2', icon: Facebook },
]
</script>

<template>
  <section class="networks-section">
    <div class="layout-container networks-container">
      <!-- TEXTE -->
      <div class="content">
        <div class="badge">Multi-Canal</div>

        <h2>
          Gérez l'ensemble de <br />
          vos réseaux sociaux <br />
          grâce à <span class="highlight">un seul outil !</span>
        </h2>

        <p>
          De LinkedIn à Instagram en passant par Facebook,
          notre assistant vous permet de communiquer rapidement
          avec vos différentes communautés.
        </p>

        <div class="cta-wrapper">
          <button class="btn-primary">
            Démarrer maintenant
            <ArrowRight :size="20" />
          </button>
          <p class="no-card">✨ Aucune carte de crédit requise</p>
        </div>
      </div>

      <!-- ILLUSTRATION -->
      <div class="illustration">
        <div class="orbit-container">
          <!-- Centre -->
          <div class="center-logo">
            <div class="logo-circle">
              <Sparkles :size="40" color="white" />
            </div>
            <div class="pulse-aura"></div>
          </div>

          <!-- Réseaux -->
          <div
            v-for="(network, i) in networks"
            :key="i"
            class="network-orbit"
            :style="{ '--rotation': `${(360 / networks.length) * i}deg` }"
          >
            <div class="network-circle" :style="{ background: network.color }">
              <component :is="network.icon" :size="24" color="white" />
            </div>
          </div>

          <!-- Rings -->
          <div class="orbit-ring ring-1"></div>
          <div class="orbit-ring ring-2"></div>
          <div class="orbit-ring ring-3"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===============================
   LAYOUT GLOBAL (IDENTIQUE HEADER)
================================= */
.layout-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ===============================
   SECTION
================================= */
.networks-section {
  padding: 140px 0 100px; /* top > header fixed */
  background: #ffffff;
  overflow: hidden;
}

/* ===============================
   GRID
================================= */
.networks-container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

/* ===============================
   TEXTE
================================= */
.badge {
  display: inline-block;
  padding: 6px 16px;
  background: #f1f5f9;
  color: #6f2dbd;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}

.content h2 {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: #0f172a;
  letter-spacing: -1px;
}

.highlight {
  background: linear-gradient(135deg, #6f2dbd, #e91e8c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content p {
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 520px;
}

/* ===============================
   CTA
================================= */
.btn-primary {
  background: #0f172a;
  color: white;
  padding: 1.2rem 2.5rem;
  border-radius: 16px;
  border: none;
  font-weight: 700;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background: #6f2dbd;
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(111, 45, 189, 0.25);
}

.no-card {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #94a3b8;
}

/* ===============================
   ILLUSTRATION
================================= */
.illustration {
  display: flex;
  justify-content: center;
}

.orbit-container {
  position: relative;
  width: 400px;
  height: 400px;
  animation: rotateMain 22s linear infinite;
}

.center-logo {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-circle {
  width: 100px;
  height: 100px;
  border-radius: 28px;
  background: linear-gradient(135deg, #6f2dbd, #e91e8c);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 50px rgba(111, 45, 189, 0.35);
  z-index: 2;
}

.pulse-aura {
  position: absolute;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(111,45,189,0.15), transparent 70%);
  animation: pulse 3s infinite;
}

/* ORBITES */
.network-orbit {
  position: absolute;
  inset: 0;
  transform: rotate(var(--rotation));
}

.network-circle {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: counterRotate 22s linear infinite reverse;
}

/* RINGS */
.orbit-ring {
  position: absolute;
  inset: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1.5px solid #f1f5f9;
}

.ring-1 { width: 180px; height: 180px; }
.ring-2 { width: 290px; height: 290px; }
.ring-3 { width: 400px; height: 400px; border-style: dashed; }

/* ANIMATIONS */
@keyframes rotateMain {
  to { transform: rotate(360deg); }
}

@keyframes counterRotate {
  to { transform: translateX(-50%) rotate(360deg); }
}

@keyframes pulse {
  50% { transform: scale(1.2); opacity: 1; }
}

/* ===============================
   RESPONSIVE
================================= */
@media (max-width: 1024px) {
  .networks-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 5rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .networks-section {
    padding: 120px 0 60px;
  }

  .orbit-container {
    width: 320px;
    height: 320px;
  }

  .ring-3 { width: 320px; height: 320px; }
  .ring-2 { width: 220px; height: 220px; }
  .ring-1 { width: 130px; height: 130px; }

  .network-circle {
    width: 50px;
    height: 50px;
    top: -20px;
  }
}
</style>
