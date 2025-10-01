import { db } from '../db.js';

export const getNotes = async (req, res) => {
  const { data, error } = await db.from('notes').select('*').eq('user_id', req.user.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const addNote = async (req, res) => {
  const { title, content, category, favorite, completed } = req.body;
  const { data, error } = await db.from('notes').insert({
    user_id: req.user.id,
    title, content, category, favorite, completed
  }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, favorite, completed } = req.body;

  const { data, error } = await db.from('notes')
    .update({ title, content, category, favorite, completed })
    .eq('id', id)
    .eq('user_id', req.user.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { error } = await db.from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', req.user.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Nota eliminada" });
};