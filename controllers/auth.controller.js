import { db } from '../db.js'; // Revisar este punto
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: existingUser } = await db
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) return res.status(400).json({ error: 'Usuario ya existe' });

    const { error } = await db.from('users').insert([{ email, password }]);
    if (error) throw error;

    res.json({ message: 'Registro exitoso' });
  } catch (err) {
    console.error('Error en register:', err.message);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user } = await db
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Error en login:', err.message);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
