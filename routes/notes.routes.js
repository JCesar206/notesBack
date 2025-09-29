import express from 'express';
import { supabase } from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware auth
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Obtener notas
router.get('/', auth, async (req, res) => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Crear nota
router.post('/', auth, async (req, res) => {
  const { title, content, category, favorite, completed } = req.body;
  const { data, error } = await supabase
    .from('notes')
    .insert([{ user_id: req.user.id, title, content, category, favorite, completed }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// Actualizar nota
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, content, category, favorite, completed } = req.body;

  const { data, error } = await supabase
    .from('notes')
    .update({ title, content, category, favorite, completed })
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// Borrar nota
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Nota eliminada' });
});

export default router;