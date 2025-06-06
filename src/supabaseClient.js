import { createClient } from '@supabase/supabase-js';

const supabaseUrl = `${window.location.origin}/api/supabase`;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
