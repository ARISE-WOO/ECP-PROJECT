<script setup>
const networks = [
  { name: 'LinkedIn', color: '#0077B5', icon: 'in' },
  { name: 'Instagram', color: '#E4405F', icon: '📷' },
  { name: 'Facebook', color: '#1877F2', icon: 'f' },
]
</script>

<template>
  <section class="networks-section">
    <div class="container">
      <div class="content">
        <h2>
          Gérez l'ensemble de <br>
          vos réseaux sociaux <br>
          grâce à <span class="highlight">un seul outil !</span>
        </h2>
        <p>
          De LinkedIn à Instagram en passant par Facebook,
          notre assistant vous permet de communiquer rapidement avec vos différentes communautés
        </p>
        <button class="btn btn-primary">
          Démarrer maintenant
          <span class="arrow">→</span>
        </button>
        <p class="no-card">Aucune carte de crédit requise</p>
      </div>

      <div class="illustration">
        <div class="orbit-container">
          <!-- Centre avec logo/icône -->
          <div class="center-logo">
            <div class="logo-circle">
              ⚡
            </div>
          </div>

          <!-- Réseaux sociaux en orbite -->
          <div 
            v-for="(network, i) in networks" 
            :key="i"
            class="network-orbit"
            :style="{ 
              '--rotation': (360 / networks.length) * i + 'deg',
              '--delay': i * 0.15 + 's'
            }"
          >
            <div class="network-circle" :style="{ background: network.color }">
              <span class="network-icon">{{ network.icon }}</span>
            </div>
          </div>

          <!-- Cercles décoratifs -->
          <div class="orbit-ring ring-1"></div>
          <div class="orbit-ring ring-2"></div>
          <div class="orbit-ring ring-3"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.networks-section {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, white 0%, #F5F5F5 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.content h2 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 2rem;
  color: #3d3f8f;
}

.highlight {
  background: linear-gradient(135deg, #ff4785, #3d3f8f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content p {
  font-size: 1.15rem;
  color: #4A4A4A;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.no-card {
  font-size: 0.9rem;
  color: #8E8E8E;
  margin-top: 1rem;
}

.illustration {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbit-container {
  position: relative;
  width: 500px;
  height: 500px;
  animation: rotate-slow 60s linear infinite;
}

/* Centre avec logo */
.center-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.logo-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3d3f8f, #ff4785);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 20px 60px rgba(61, 63, 143, 0.3);
  animation: pulse-center 3s ease-in-out infinite;
}

/* Orbites des réseaux sociaux */
.network-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%) rotate(var(--rotation));
  animation: counter-rotate 60s linear infinite reverse;
  animation-delay: var(--delay);
}

.network-circle {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  animation: float-subtle 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

.network-circle:hover {
  transform: translateX(-50%) scale(1.15);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
}

.network-icon {
  font-size: 2rem;
  color: white;
  font-weight: bold;
}

/* Anneaux décoratifs */
.orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(61, 63, 143, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.ring-1 {
  width: 250px;
  height: 250px;
  animation: pulse-ring 4s ease-in-out infinite;
}

.ring-2 {
  width: 350px;
  height: 350px;
  animation: pulse-ring 4s ease-in-out infinite;
  animation-delay: 1s;
}

.ring-3 {
  width: 450px;
  height: 450px;
  animation: pulse-ring 4s ease-in-out infinite;
  animation-delay: 2s;
}

/* Animations */
@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes counter-rotate {
  from { transform: translate(-50%, -50%) rotate(var(--rotation)); }
  to { transform: translate(-50%, -50%) rotate(calc(var(--rotation) - 360deg)); }
}

@keyframes pulse-center {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes float-subtle {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

@keyframes pulse-ring {
  0%, 100% { 
    opacity: 0.1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% { 
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1.05);
  }
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .content h2 {
    font-size: 2rem;
  }
  
  .illustration {
    height: 500px;
    margin-top: 3rem;
  }

  .orbit-container {
    width: 400px;
    height: 400px;
  }

  .network-circle {
    width: 60px;
    height: 60px;
  }

  .network-icon {
    font-size: 1.5rem;
  }

  .logo-circle {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }
}
</style>