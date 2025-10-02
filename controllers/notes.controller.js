import pool from "../db.js";

export const getNotes = async (req, res) => {
  try {
    const { id } = req.user; // viene del middleware
    const result = await pool.query("SELECT * FROM notes WHERE user_id=$1", [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener notas" });
  }
};

export const addNote = async (req, res) => {
  try {
    const { title, content, category, emoji, favorite, completed } = req.body;
    const { id } = req.user;

    const result = await pool.query(
      "INSERT INTO notes (user_id, title, content, category, emoji, favorite, completed) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [id, title, content, category, emoji, favorite, completed]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear nota" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, emoji, favorite, completed } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      "UPDATE notes SET title=$1, content=$2, category=$3, emoji=$4, favorite=$5, completed=$6 WHERE id=$7 AND user_id=$8 RETURNING *",
      [title, content, category, emoji, favorite, completed, id, userId]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar nota" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query("DELETE FROM notes WHERE id=$1 AND user_id=$2 RETURNING *", [id, userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Nota no encontrada" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar nota" });
  }
};
