import { supabase } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashed }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error || !data) return res.status(401).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, data.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ userId: data.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: data.id, email: data.email } });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};