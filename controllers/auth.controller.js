import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../db.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email y contraseña son requeridos" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insertar usuario
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword }])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: "Usuario registrado", user: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) return res.status(400).json({ error: "Usuario no encontrado" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};