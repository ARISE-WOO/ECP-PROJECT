import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from './auth'

export const useCompanyStore = defineStore('company', () => {
  const company = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Charger l'entreprise par user_id
  async function loadCompany() {
    const authStore = useAuthStore()
    if (!authStore.user) return

    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', authStore.user.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      company.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Erreur lors du chargement de l\'entreprise:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Charger l'entreprise par telegram_chat_id
  async function loadCompanyByTelegramId(telegramChatId) {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('companies')
        .select('*')
        .eq('telegram_chat_id', telegramChatId)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      company.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Erreur lors du chargement de l\'entreprise:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Créer ou mettre à jour une entreprise
  async function saveCompany(companyData) {
    const authStore = useAuthStore()
    if (!authStore.user) throw new Error('User not authenticated')

    loading.value = true
    error.value = null

    try {
      const payload = {
        user_id: authStore.user.id,
        telegram_chat_id: companyData.telegram_chat_id || authStore.user.telegram_id,
        name: companyData.name,
        industry: companyData.industry,
        location: companyData.location,
        opening_hours: companyData.opening_hours,
        target_audience: companyData.target_audience,
        tone_voice: companyData.tone_voice || 'Professionnel',
        onboarding_completed: companyData.onboarding_completed || false,
        oauth_completed: companyData.oauth_completed || false,
        conversation_step: companyData.conversation_step || 'NEW'
      }

      const { data, error: saveError } = await supabase
        .from('companies')
        .upsert(payload, {
          onConflict: 'telegram_chat_id'
        })
        .select()
        .single()

      if (saveError) throw saveError

      company.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Erreur lors de la sauvegarde de l\'entreprise:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mettre à jour l'étape de conversation
  async function updateConversationStep(telegramChatId, step) {
    loading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('companies')
        .update({ conversation_step: step })
        .eq('telegram_chat_id', telegramChatId)
        .select()
        .single()

      if (updateError) throw updateError

      company.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Erreur lors de la mise à jour de l\'étape:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    company,
    loading,
    error,
    loadCompany,
    loadCompanyByTelegramId,
    saveCompany,
    updateConversationStep
  }
})