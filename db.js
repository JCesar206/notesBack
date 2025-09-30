import { createClient } from "@supabase/supabase-js"; // DB

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ No se encontraron las credenciales de Supabase.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);