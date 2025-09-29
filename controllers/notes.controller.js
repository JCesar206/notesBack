import { supabase } from '../db.js';

export const getNotes = async (req, res) => {
  const userId = req.userId;
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const addNote = async (req, res) => {
  const userId = req.userId;
  const { title, content, category, favorite, completed } = req.body;
  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, content, category, favorite, completed, user_id: userId }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
};

export const updateNote = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { title, content, category, favorite, completed } = req.body;
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content, category, favorite, completed })
    .eq('id', id)
    .eq('user_id', userId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
};

export const deleteNote = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Nota eliminada' });
};