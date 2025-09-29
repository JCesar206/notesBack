import express from 'express';
import { supabase } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashed }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Usuario creado', user: data[0] });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error || users.length === 0)
    return res.status(401).json({ error: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, users[0].password);
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: users[0].id, email: users[0].email } });
});

export default router;