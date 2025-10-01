// src/controllers/notes.controller.js
import { supabase } from "../db.js";

// Obtener notas
export const getNotes = async (req, res) => {
  try {
    const { data, error } = await db.from('notes').select('*').eq('user_id', req.user.id);
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("Get notes error:", err);
    res.status(500).json({ message: "Error fetching notes" });
  }
};

// Crear nota
export const addNote = async (req, res) => {
  try {
    const { title, content, category, favorite, completed } = req.body;
    const { error } = await db.from('notes').insert([{
      user_id: req.user.id,
      title,
      content,
      category,
      favorite,
      completed
    }]);
    if (error) throw error;
    res.json({ message: 'Nota agregada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error agregando nota' });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, favorite, completed } = req.body;
  try {
    const { id } = req.params;
    const { title, content, category, favorite, completed } = req.body;

    const { error } = await db.from('notes')
      .update({ title, content, category, favorite, completed })
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ message: 'Nota actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error actualizando nota' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await db.from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);
    if (error) throw error;
    res.json({ message: 'Nota eliminada' });
  } catch (err) {
    console.error("Add note error:", err);
    res.status(500).json({ message: "Error creating note" });
  }
};

// Actualizar nota
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const { data, error } = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("Update note error:", err);
    res.status(500).json({ message: "Error updating note" });
  }
};

// Eliminar nota
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Delete note error:", err);
    res.status(500).json({ message: "Error deleting note" });
  }
};