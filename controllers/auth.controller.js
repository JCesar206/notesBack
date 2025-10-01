import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email y password son requeridos" });

  const { data: existingUser } = await db.from('users').select('*').eq('email', email).single();
  if (existingUser) return res.status(400).json({ error: "Usuario ya existe" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: user, error } = await db.from('users').insert({ email, password: hashedPassword }).select().single();
  if (error) return res.status(500).json({ error: error.message });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email y password son requeridos" });

  const { data: user } = await db.from('users').select('*').eq('email', email).single();
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: "Credenciales inválidas" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};