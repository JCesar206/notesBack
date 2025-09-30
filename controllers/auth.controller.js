import { supabase } from '../db.js';

// Registro de usuario...
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;
    res.json({ message: "✅ Usuario registrado", user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({
      message: "✅ Login exitoso",
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Perfil del usuario autenticado
export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;
    res.json(data.user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    res.json({ message: "✅ Logout exitoso" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};