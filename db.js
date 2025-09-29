import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); // solo hace efecto en local con .env

// Usar variables de entorno para producción (Render) y local
const supabaseUrl = process.env.SUPABASE_URL || 'https://jeoejvyvnigzkedlzsev.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ No se encontraron las credenciales de Supabase. Verifica tus variables de entorno.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Conexión a Supabase lista:", supabaseUrl);