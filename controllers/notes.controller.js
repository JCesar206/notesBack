import pool from "../db.js";

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM notes WHERE user_id=$1", [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo notas" });
  }
};

export const addNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content, category, emoji, favorite, completed } = req.body;

    await pool.query(
      "INSERT INTO notes (user_id, title, content, category, emoji, favorite, completed) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [userId, title, content, category, emoji, favorite, completed]
    );

    res.json({ message: "Nota agregada" });
  } catch (err) {
    res.status(500).json({ error: "Error agregando nota" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, content, category, emoji, favorite, completed } = req.body;

    await pool.query(
      "UPDATE notes SET title=$1, content=$2, category=$3, emoji=$4, favorite=$5, completed=$6 WHERE id=$7 AND user_id=$8",
      [title, content, category, emoji, favorite, completed, id, userId]
    );

    res.json({ message: "Nota actualizada" });
  } catch (err) {
    res.status(500).json({ error: "Error actualizando nota" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await pool.query("DELETE FROM notes WHERE id=$1 AND user_id=$2", [id, userId]);

    res.json({ message: "Nota eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error eliminando nota" });
  }
};
