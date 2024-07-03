import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    process.env.PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.SECRET_SUPABASE_API_KEY_SERVICE!,
)