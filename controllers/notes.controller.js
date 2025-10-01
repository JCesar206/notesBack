// src/controllers/notes.controller.js
import { supabase } from '../db.js';

export const getNotes = async (req, res) => {
  try {
    const { data, error } = await supabase.from('notes').select('*').eq('user_id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo notas' });
  }
};

export const addNote = async (req, res) => {
  try {
    const { title, content, category, favorite, completed } = req.body;
    const { data, error } = await supabase.from('notes').insert([{ title, content, category, favorite, completed, user_id: req.user.id }]);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error agregando nota' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, favorite, completed } = req.body;
    const { data, error } = await supabase.from('notes').update({ title, content, category, favorite, completed }).eq('id', id).eq('user_id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error actualizando nota' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('notes').delete().eq('id', id).eq('user_id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Nota eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando nota' });
  }
};
