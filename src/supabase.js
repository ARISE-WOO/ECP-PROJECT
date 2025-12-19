// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL // Doit avoir VITE_
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Les variables Supabase sont manquantes dans le fichier .env")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
