import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase } from "./db.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword }])
      .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Usuario registrado", user: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) return res.status(401).json({ error: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ error: "Faltan datos" });

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { data, error } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("email", email);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Contraseña actualizada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar la contraseña" });
  }
};