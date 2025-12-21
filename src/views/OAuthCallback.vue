<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, AlertCircle } from 'lucide-vue-next'

const route = useRoute()
const status = ref('loading')
const message = ref('Finalisation de la connexion...')
const platform = ref('')

onMounted(async () => {
  try {
    // 1. Récupérer l'ID Telegram (soit via l'URL du bot, soit via le stockage local)
    const telegramId = route.query.tid || localStorage.getItem('telegram_id')
    const networkParam = route.query.network 
    
    if (!telegramId) {
      throw new Error('Identifiant Telegram introuvable. Veuillez recommencer depuis le bot.')
    }

    // 2. Récupérer la session OAuth fraîchement créée par Supabase
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) throw sessionError
    if (!session) throw new Error('Session OAuth introuvable. Veuillez vous reconnecter.')

    // Le provider est soit passé en URL, soit détecté via Supabase (linkedin, facebook, etc.)
    platform.value = networkParam || session.provider || 'réseau social'

    // 3. Récupérer l'utilisateur local lié au telegram_id
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('telegram_id', telegramId)
      .single()
    
    if (userError || !user) throw new Error('Utilisateur non trouvé dans la base de données.')

    // 4. Récupérer l'entreprise liée à cet utilisateur
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', user.id)
      .single()
    
    if (companyError || !company) throw new Error('Profil entreprise non trouvé. Répondez d\'abord aux questions du bot.')

    // 5. Sauvegarder les tokens du réseau social (LinkedIn/FB) dans oauth_tokens
    // ATTENTION : On utilise provider_token et non access_token
    const tokenData = {
      user_id: user.id,
      company_id: company.id,
      platform: platform.value,
      access_token: session.provider_token, // Le token pour poster sur le réseau
      refresh_token: session.provider_refresh_token || null,
      expires_at: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : null,
      platform_user_id: session.user.id
    }

    const { error: tokenError } = await supabase
      .from('oauth_tokens')
      .upsert(tokenData, { onConflict: 'user_id,platform' })
    
    if (tokenError) throw tokenError

    // 6. Marquer l'onboarding comme complété pour cette entreprise
    await supabase
      .from('companies')
      .update({ oauth_completed: true })
      .eq('id', company.id)

    status.value = 'success'
    message.value = `Connexion avec ${platform.value} réussie !`

    // 7. Redirection vers le Bot Telegram après 3 secondes
    setTimeout(() => {
      const botUrl = import.meta.env.VITE_TELEGRAM_BOT_URL
      // On envoie un paramètre "start" pour que le bot sache quel réseau a été connecté
      window.location.href = `${botUrl}?start=auth_${platform.value}_success`
    }, 3000)

  } catch (error) {
    status.value = 'error'
    message.value = error.message || 'Une erreur est survenue lors de la connexion.'
    console.error('Détails OAuth Callback Error:', error)
  }
})
</script>

<template>
  <div class="callback-page">
    <div class="callback-card">
      
      <!-- État : Chargement -->
      <div v-if="status === 'loading'" class="status-box">
        <div class="loader"></div>
        <h2>{{ message }}</h2>
        <p>Veuillez ne pas fermer cette fenêtre...</p>
      </div>
      
      <!-- État : Succès -->
      <div v-else-if="status === 'success'" class="status-box">
        <div class="success-icon">
          <CheckCircle2 :size="80" color="#10b981" />
        </div>
        <h2>Génial !</h2>
        <p>{{ message }}</p>
        <p class="small">Redirection vers Telegram...</p>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
      
      <!-- État : Erreur -->
      <div v-else class="status-box">
        <div class="error-icon">
          <AlertCircle :size="80" color="#ef4444" />
        </div>
        <h2 style="color: #ef4444">Oups !</h2>
        <p>{{ message }}</p>
        <button @click="window.close()" class="btn-close">Fermer la fenêtre</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.callback-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.callback-card {
  background: white;
  padding: 3.5rem;
  border-radius: 30px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
  max-width: 480px;
  width: 100%;
  text-align: center;
}

.loader {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

h2 { font-size: 1.8rem; font-weight: 800; color: #1e293b; margin-bottom: 1rem; }
p { color: #64748b; font-size: 1.1rem; margin-bottom: 0.5rem; }
.small { font-size: 0.9rem; opacity: 0.8; }

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  margin-top: 2rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #10b981;
  animation: progress 3s linear forwards;
}

@keyframes progress { from { width: 0%; } to { width: 100%; } }

.btn-close {
  margin-top: 2rem;
  background: #f1f5f9;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  color: #475569;
}
</style>
```

---

## 📋 **Résumé du flux complet**
```
1. Site (/) 
   → Clic "Démarrer" 
   → Modal s'ouvre

2. Modal 
   → Clic "Se connecter avec Telegram" 
   → Redirection /auth/telegram

3. Page Telegram Auth (/auth/telegram)
   → Widget Telegram
   → User autorise
   → Profil créé dans Supabase (table users)
   → Redirection vers bot Telegram

4. Bot Telegram (géré par votre coéquipier)
   → Pose 6 questions
   → Sauvegarde dans Supabase (table companies)
   → Envoie lien OAuth: https://site.com/auth/callback?network=linkedin&tid=123456

5. Page OAuth Callback (/auth/callback)
   → Récupère session OAuth
   → Sauvegarde tokens dans Supabase (table oauth_tokens)
   → Update oauth_completed = true
   → Redirection vers bot: https://t.me/bot?start=oauth_success_linkedin

6. Bot Telegram
   → Détecte oauth_success
   → Message: "✅ Merci ! Votre assistant est prêt"