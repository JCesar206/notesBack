import { supabase } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Comparar password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Generar token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};