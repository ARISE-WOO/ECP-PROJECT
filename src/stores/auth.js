import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase' 

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const telegramUser = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const hasTelegramAuth = computed(() => !!telegramUser.value?.telegram_id)

  // Connexion via Telegram
  async function loginWithTelegram(telegramData) {
    loading.value = true
    error.value = null

    try {
      // Vérifier si l'utilisateur existe
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', telegramData.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      // Créer ou mettre à jour l'utilisateur
      if (existingUser) {
        user.value = existingUser
      } else {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            telegram_id: telegramData.id,
            telegram_username: telegramData.username,
            telegram_first_name: telegramData.first_name
          })
          .select()
          .single()

        if (insertError) throw insertError
        user.value = newUser
      }

      telegramUser.value = telegramData
      localStorage.setItem('telegram_user', JSON.stringify(telegramData))
      
      return user.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Charger l'utilisateur depuis le localStorage
  function loadFromStorage() {
    const stored = localStorage.getItem('telegram_user')
    if (stored) {
      telegramUser.value = JSON.parse(stored)
    }
  }

  // Déconnexion
  function logout() {
    user.value = null
    telegramUser.value = null
    localStorage.removeItem('telegram_user')
  }

  return {
    user,
    telegramUser,
    loading,
    error,
    isAuthenticated,
    hasTelegramAuth,
    loginWithTelegram,
    loadFromStorage,
    logout
  }
})