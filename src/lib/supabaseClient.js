import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jsodarjmheongyrdsvwy.supabase.co"
const supabaseKey = "sb_publishable_ZSuZXTYGBZwH1yrH-auKDQ_FYfFW2jM"

export const supabase = createClient(supabaseUrl, supabaseKey)
