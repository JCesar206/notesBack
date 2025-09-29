import express from 'express';
import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [exists] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (exists.length > 0) return res.status(400).json({ error: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed]);
    res.json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, users[0].password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, email: users[0].email });
  } catch (err) {
    res.status(500).json({ error: 'Error al hacer login' });
  }
});

export default router;