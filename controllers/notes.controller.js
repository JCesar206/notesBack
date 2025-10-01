import { db } from '../db.js';

export const getNotes = async (req, res) => {
  try {
    const { data, error } = await db.from('notes').select('*').eq('user_id', req.userId);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addNote = async (req, res) => {
  const { title, content, category, favorite, completed } = req.body;
  try {
    const { data, error } = await db.from('notes').insert([{
      user_id: req.userId,
      title, content, category, favorite, completed
    }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, favorite, completed } = req.body;
  try {
    const { data, error } = await db.from('notes')
      .update({ title, content, category, favorite, completed })
      .eq('id', id)
      .eq('user_id', req.userId);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await db.from('notes').delete().eq('id', id).eq('user_id', req.userId);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: "Nota eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};