import { supabase } from '../db.js';

// Obtener todas las notas
export const getNotes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear nota
export const createNote = async (req, res) => {
  try {
    const { title, content, category, favorite, completed } = req.body;
    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, category, favorite, completed }])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar nota
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, favorite, completed } = req.body;

    const { data, error } = await supabase
      .from('notes')
      .update({ title, content, category, favorite, completed })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar nota
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('notes').delete().eq('id', id);

    if (error) throw error;
    res.json({ message: "Nota eliminada con éxito" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};