import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("❌ Debes definir JWT_SECRET en las variables de entorno.");

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email y password son requeridos" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await db.from('users').insert([{ email, password: hashedPassword }]);
    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email y password son requeridos" });

  try {
    const { data, error } = await db.from('users').select('*').eq('email', email).single();
    if (error || !data) return res.status(400).json({ error: "Credenciales inválidas" });

    const valid = await bcrypt.compare(password, data.password);
    if (!valid) return res.status(400).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ userId: data.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};