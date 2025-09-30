import { db } from "../db.js";

export const getNotes = async (req, res) => {
  try {
    const [notes] = await db.query("SELECT * FROM notes WHERE user_id = ?", [req.user.id]);
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener notas" });
  }
};

export const addNote = async (req, res) => {
  const { title, content, category, favorite, completed } = req.body;
  try {
    await db.query(
      "INSERT INTO notes (user_id, title, content, category, favorite, completed) VALUES (?, ?, ?, ?, ?, ?)",
      [req.user.id, title, content, category, favorite, completed]
    );
    res.json({ message: "Nota agregada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar nota" });
  }
};

export const updateNote = async (req, res) => {
  const { title, content, category, favorite, completed } = req.body;
  try {
    await db.query(
      "UPDATE notes SET title=?, content=?, category=?, favorite=?, completed=? WHERE id=? AND user_id=?",
      [title, content, category, favorite, completed, req.params.id, req.user.id]
    );
    res.json({ message: "Nota actualizada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar nota" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await db.query("DELETE FROM notes WHERE id=? AND user_id=?", [req.params.id, req.user.id]);
    res.json({ message: "Nota eliminada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar nota" });
  }
};