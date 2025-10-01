import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ No se encontraron las credenciales de Supabase. Verifica tus variables de entorno.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);