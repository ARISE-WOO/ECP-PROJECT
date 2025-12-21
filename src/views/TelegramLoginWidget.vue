<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const error = ref(null)
const success = ref(false)
const isLoading = ref(true)

const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME
const botUrl = import.meta.env.VITE_TELEGRAM_BOT_URL

// Correction de la redirection : Utilisation de https:// obligatoire
const loginWithTelegramURL = () => {
  if (!botUsername) {
    error.value = "Configuration du bot manquante."
    return
  }
  const origin = window.location.origin
  // Utilisation de backticks (`) pour injecter la variable botUsername
  const authUrl = `oauth.telegram.org{botUsername}&origin=${encodeURIComponent(origin)}&embed=1`
  
  console.log("🔗 Redirection externe vers :", authUrl)
  window.location.assign(authUrl)
}

onMounted(async () => {
  if (!botUsername || !botUrl) {
    error.value = 'Configuration Telegram manquante.'
    isLoading.value = false
    return
  }

  // Gestion du retour de redirection (si l'utilisateur revient de Telegram)
  const params = new URLSearchParams(window.location.search)
  if (params.has('hash')) {
    const user = Object.fromEntries(params.entries())
    window.onTelegramAuth(user)
  }

  // Callback global
  window.onTelegramAuth = async (user) => {
    isLoading.value = true
    try {
      localStorage.setItem('telegram_id', user.id.toString())
      localStorage.setItem('telegram_user', JSON.stringify(user))

      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('telegram_id', user.id)
        .single()

      if (!existingUser) {
        const { error: insErr } = await supabase.from('users').insert([{
          telegram_id: user.id,
          telegram_username: user.username || null,
          first_name: user.first_name,
          last_name: user.last_name || null,
          photo_url: user.photo_url || null
        }])
        if (insErr) throw insErr
      }

      success.value = true
      setTimeout(() => { window.location.href = `${botUrl}?start=welcome` }, 2000)
    } catch (err) {
      error.value = err.message
      isLoading.value = false
    }
  }

  // Chargement du Widget
  try {
    await nextTick()
    const container = document.getElementById('telegram-login-container')
    if (!container) return

    const script = document.createElement('script')
    // Correction de l'URL avec https://
    script.src = 'telegram.org'
    script.setAttribute('data-telegram-login', botUsername)
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-radius', '10')
    script.setAttribute('data-request-access', 'write')
    script.setAttribute('data-onauth', 'onTelegramAuth(user)')
    script.async = true
    
    script.onload = () => { isLoading.value = false }
    script.onerror = () => { 
      isLoading.value = false 
      console.error("Le script Telegram n'a pas pu être chargé.")
    }
    
    container.appendChild(script)
  } catch (err) {
    isLoading.value = false
  }
})

const goBack = () => router.push('/')
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="20" /> Retour
      </button>
      
      <div v-if="!success">
        <div class="logo">
          <div class="logo-icon">⚡</div>
          <h1>ECP Assistant</h1>
        </div>
        
        <h2>Étape 1 : Connexion Telegram</h2>
        
        <div id="telegram-login-container" class="telegram-widget">
          <div v-if="isLoading" class="widget-loader">
            <div class="loader"></div>
            <p>Chargement du widget...</p>
          </div>
        </div>

        <!-- Bouton visible si le widget échoue à cause du domaine/localhost -->
        <div v-if="!success" class="fallback-container">
          <p class="small-text">Problème d'affichage ?</p>
          <button @click="loginWithTelegramURL" class="btn-direct">
            Se connecter via le lien direct
          </button>
        </div>
        
        <div v-if="error" class="error-message">
          <AlertCircle :size="20" />
          <span>{{ error }}</span>
        </div>
      </div>
      
      <div v-else class="success-box">
        <CheckCircle2 :size="80" color="#10b981" />
        <h2>✅ Connexion réussie !</h2>
        <p>Redirection en cours...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.auth-card {
  background: white;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 550px;
  width: 100%;
  position: relative;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-btn {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: #f1f5f9;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #64748b;
  font-weight: 600;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #e2e8f0;
  transform: translateX(-3px);
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  padding-top: 2rem;
}

.progress-step {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.progress-step.active {
  background: linear-gradient(135deg, #6F2DBD, #E91E8C);
  color: white;
  box-shadow: 0 4px 15px rgba(111, 45, 189, 0.4);
}

.progress-line {
  width: 60px;
  height: 3px;
  background: #e2e8f0;
}

.logo {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

h1 {
  font-size: 1.75rem;
  color: #667eea;
  margin: 0;
  font-weight: 800;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #0f172a;
  text-align: center;
  font-weight: 700;
}

.subtitle {
  color: #64748b;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.telegram-widget {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  min-height: 60px;
}

.widget-loader {
  text-align: center;
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.widget-loader p {
  color: #94a3b8;
  font-size: 0.9rem;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #fecaca;
}

.info-box {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
  border: 1px solid #e2e8f0;
}

.info-box h3 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
}

.info-box ul {
  margin: 0;
  padding-left: 1.5rem;
}

.info-box li {
  margin-bottom: 0.75rem;
  color: #475569;
  line-height: 1.6;
}

.debug-info {
  margin-top: 2rem;
  padding: 1rem;
  background: #fef3c7;
  border-radius: 8px;
  font-size: 0.85rem;
}

.debug-info summary {
  cursor: pointer;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 0.5rem;
}

.debug-info pre {
  margin: 0.25rem 0;
  color: #78350f;
  font-family: 'Courier New', monospace;
}

.success-box {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  margin-bottom: 2rem;
  animation: scaleIn 0.6s ease-out;
}

@keyframes scaleIn {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.progress-bar-success {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 2rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #10b981, #059669);
  animation: progressFill 2s ease-out;
}

@keyframes progressFill {
  from { width: 0%; }
  to { width: 100%; }
}

@media (max-width: 640px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }

  .progress-step {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .progress-line {
    width: 40px;
  }

  h2 {
    font-size: 1.25rem;
  }
}

.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f8fafc; }
.auth-card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 100%; max-width: 400px; text-align: center; }
.telegram-widget { margin: 2rem 0; min-height: 40px; display: flex; justify-content: center; }
.error-message { color: #ef4444; display: flex; align-items: center; gap: 0.5rem; justify-content: center; margin-top: 1rem; }
.loader { border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; width: 20px; height: 20px; animation: spin 2s linear infinite; margin: 0 auto; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>

