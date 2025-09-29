import { createClient } from '@supabase/supabase-js';

// Lee variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Verificación
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Variables de entorno actuales:", {
    SUPABASE_URL: supabaseUrl,
    SUPABASE_KEY: supabaseKey ? "✅ definida" : "❌ vacía"
  });
  throw new Error("❌ No se encontraron las credenciales de Supabase. Verifica tus variables de entorno en Render.");
}

// Cliente supabase listo
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;