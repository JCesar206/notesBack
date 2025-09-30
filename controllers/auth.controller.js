import { supabase } from "../db.js";

// Registrar usuario en db
export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email y password requeridos" });
  }

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ user: data[0] });
};

// Login usuario
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email y password requeridos" });
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password);

  if (error) return res.status(500).json({ error: error.message });
  if (!data || data.length === 0)
    return res.status(401).json({ error: "Credenciales inválidas" });

  res.json({ message: "Login exitoso", user: data[0] });
};