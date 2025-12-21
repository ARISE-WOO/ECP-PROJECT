<script setup>
import { Sparkles, MessageCircle, CheckCircle, ArrowRight } from 'lucide-vue-next'

const emit = defineEmits(['close'])

// URL du bot Telegram
const botUrl = 'https://t.me/ECP_2025_Sarika_Bot'

const startWithTelegram = () => {
  window.location.href = botUrl
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <button class="close-btn" @click="emit('close')">×</button>
      
      <div class="modal-content">
        <div class="logo">
          <Sparkles :size="60" color="#6F2DBD" />
        </div>
        
        <h2>Connectez vos réseaux sociaux</h2>
        <p class="subtitle">
          Notre bot gérera automatiquement vos publications sur LinkedIn, Facebook et Instagram
        </p>
        
        <div class="cta-buttons">
          <button class="btn-telegram" @click="startWithTelegram">
            <MessageCircle :size="20" />
            Se connecter avec Telegram
          </button>
          
          <!-- Optionnel : Connexion compte existant -->
          <button class="btn-secondary" disabled>
            <CheckCircle :size="20" />
            Se connecter avec un compte existant
            <span class="badge">Bientôt</span>
          </button>
        </div>
        
        <div class="flow-preview">
          <h3>Comment ça marche ?</h3>
          <div class="flow-steps">
            <div class="flow-step">
              <span class="flow-number">1</span>
              <span>Connectez Telegram</span>
            </div>
            <ArrowRight :size="16" class="flow-arrow" />
            <div class="flow-step">
              <span class="flow-number">2</span>
              <span>Remplissez vos infos</span>
            </div>
            <ArrowRight :size="16" class="flow-arrow" />
            <div class="flow-step">
              <span class="flow-number">3</span>
              <span>Autorisez OAuth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: white;
  border-radius: 24px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f1f5f9;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #e2e8f0;
  transform: rotate(90deg);
}

.modal-content {
  padding: 3rem 2.5rem;
  text-align: center;
}

.logo {
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.subtitle {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-telegram {
  width: 100%;
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s;
}

.btn-telegram:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(111, 45, 189, 0.3);
}

.btn-secondary {
  width: 100%;
  background: white;
  color: #64748b;
  padding: 1rem 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #f59e0b;
  color: white;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-weight: 700;
}

.flow-preview {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
}

.flow-preview h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
}

.flow-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #64748b;
  flex: 1;
}

.flow-number {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}

.flow-arrow {
  color: #cbd5e1;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .flow-steps {
    flex-direction: column;
    gap: 1rem;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
  }
}
</style>