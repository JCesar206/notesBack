import pool from "../db.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, category, favorite, completed } = req.body;
    const userId = req.user.id;
    if (!title) return res.status(400).json({ error: "Título requerido" });

    const [result] = await pool.query(
      "INSERT INTO notes (user_id, title, content, category, favorite, completed) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, title, content || null, category || null, favorite ? 1 : 0, completed ? 1 : 0]
    );
    return res.status(201).json({ message: "Nota creada", noteId: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al crear nota" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query("SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al obtener notas" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { title, content, category, favorite, completed } = req.body;

    const [result] = await pool.query(
      "UPDATE notes SET title=?, content=?, category=?, favorite=?, completed=? WHERE id=? AND user_id=?",
      [title, content, category, favorite ? 1 : 0, completed ? 1 : 0, id, userId]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Nota no encontrada" });
    return res.json({ message: "Nota actualizada" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al actualizar nota" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const [result] = await pool.query("DELETE FROM notes WHERE id=? AND user_id=?", [id, userId]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nota no encontrada" });
    return res.json({ message: "Nota eliminada" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al eliminar nota" });
  }
};