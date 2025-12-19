<script setup>
import { Sparkles, ArrowRight } from 'lucide-vue-next'

const emit = defineEmits(['open-modal'])
</script>

<template>
  <section class="cta-section">
    <div class="cta-container">
      <div class="glow-overlay"></div>
      <h2>Prêt à automatiser votre Community Management ?</h2>
      <p>
        Commencez gratuitement et transformez votre présence sur les réseaux sociaux
      </p>
      <button class="btn-cta-primary" @click="emit('open-modal')">
        Configurer mon Assistant Maintenant
        <ArrowRight :size="20" class="arrow-icon" />
      </button>
      <div class="no-card-info">
        <Sparkles :size="16" />
        Version d'essai immédiate, aucune carte requise.
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #6f2dbd, #e91e8c); /* Fond dégradé vif */
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Effet de lueur subtil au centre */
.glow-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
  pointer-events: none;
  border-radius: 50%;
}

.cta-container {
  max-width: 800px;
  margin: auto;
  position: relative; /* Assure que le contenu est au-dessus du glow-overlay */
  z-index: 1;
}

.cta-section h2 {
  font-size: clamp(2.5rem, 5vw, 3.5rem); /* Taille adaptative */
  font-weight: 900; /* Plus impactant */
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Ombre douce sur le texte */
}

.cta-section p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem; /* Plus d'espace avant le bouton */
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Bouton professionnel et animé */
.btn-cta-primary {
  background: white;
  color: #6f2dbd; /* Couleur de la marque */
  padding: 1.1rem 2.5rem;
  border-radius: 12px;
  border: none;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.btn-cta-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  color: #e91e8c; /* Change de couleur au survol */
}

.arrow-icon {
  transition: transform 0.3s;
}

.btn-cta-primary:hover .arrow-icon {
  transform: translateX(5px); /* Animation de la flèche */
}

.no-card-info {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .cta-section {
    padding: 6rem 1rem;
  }
}
</style>
