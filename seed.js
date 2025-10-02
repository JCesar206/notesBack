import pool from "./db.js";
import bcrypt from "bcryptjs";

export const seed = async () => {
  try {
    // Crear tabla usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    // Crear tabla notas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        category VARCHAR(100),
        emoji VARCHAR(10),
        favorite BOOLEAN DEFAULT false,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Usuario de prueba
    const email = "test@example.com";
    const passwordHash = await bcrypt.hash("123456", 10);

    const userExists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (userExists.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, passwordHash]
      );
      console.log("✅ Usuario de prueba insertado");
    } else {
      console.log("ℹ️ Usuario de prueba ya existía");
    }

    // Nota de prueba
    const user = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
    const userId = user.rows[0].id;

    const noteExists = await pool.query("SELECT * FROM notes WHERE user_id=$1", [userId]);

    if (noteExists.rows.length === 0) {
      await pool.query(
        "INSERT INTO notes (user_id, title, content, category, emoji, favorite, completed) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [userId, "Nota de prueba", "Contenido inicial", "General", "📝", true, false]
      );
      console.log("✅ Nota de prueba insertada");
    } else {
      console.log("ℹ️ Nota de prueba ya existía");
    }

  } catch (err) {
    console.error("❌ Error en seed:", err);
  }
};
