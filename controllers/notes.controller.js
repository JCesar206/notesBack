import { supabase } from "../db.js";

// Obtener notas de la db
export const getNotes = async (req, res) => {
  const { data, error } = await supabase.from("notes").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Agregar nota
export const addNote = async (req, res) => {
  const { title, content, user_id } = req.body;
  if (!title || !content || !user_id) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content, user_id }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

// Actualizar nota
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const { data, error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
};

// Eliminar nota
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Nota eliminada" });
};