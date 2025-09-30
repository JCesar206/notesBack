import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../db.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.from("users").insert([{ email, password }]);
    if (error) throw error;
    res.json({ message: "Registro exitoso" });
  } catch (err) {
    console.error("Error en register:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.error("Error en login:", err.message);
    res.status(500).json({ error: err.message });
  }
};