// src/routes/debug.routes.js
import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Endpoint para ver usuarios y notas
router.get("/db", async (req, res) => {
  try {
    // Traer usuarios
    const usersResult = await pool.query("SELECT id, email, created_at FROM users");
    const users = usersResult.rows;

    // Traer notas
    const notesResult = await pool.query(`
      SELECT n.id, n.title, n.content, n.category, n.emoji, n.favorite, n.completed, n.created_at, u.email AS user_email
      FROM notes n
      JOIN users u ON n.user_id = u.id
    `);
    const notes = notesResult.rows;

    res.json({ users, notes });
  } catch (err) {
    console.error("❌ Error en /api/debug/db:", err.message);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});

export default router;
