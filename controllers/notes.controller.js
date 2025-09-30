import { supabase } from "../db.js";

export const getNotes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", req.user.id);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error en getNotes:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const addNote = async (req, res) => {
  const { title, content, category, favorite, completed } = req.body;
  try {
    const { data, error } = await supabase.from("notes").insert([{
      user_id: req.user.id,
      title,
      content,
      category,
      favorite,
      completed
    }]);
    if (error) throw error;
    res.json({ message: "Nota agregada", note: data[0] });
  } catch (err) {
    console.error("Error en addNote:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, favorite, completed } = req.body;
  try {
    const { data, error } = await supabase
      .from("notes")
      .update({ title, content, category, favorite, completed })
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) throw error;
    res.json({ message: "Nota actualizada" });
  } catch (err) {
    console.error("Error en updateNote:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) throw error;
    res.json({ message: "Nota eliminada" });
  } catch (err) {
    console.error("Error en deleteNote:", err.message);
    res.status(500).json({ error: err.message });
  }
};