// src/controllers/auth.controller.js
import { supabase } from '../db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: 'Usuario registrado', user: data.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en registro' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ error: error.message });

    const token = jwt.sign({ id: data.user.id, email: data.user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: data.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en login' });
  }
};