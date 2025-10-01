// src/controllers/notes.controller.js
import { supabase } from "../db.js";

// Obtener notas
export const getNotes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", req.user.id);

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
    const { title, content } = req.body;

    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, content, user_id: req.user.id }])
      .select()
      .single();

    if (error) throw error;

    res.json(data);
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
