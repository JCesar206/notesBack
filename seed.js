// src/seed.js
import { pool } from "./db.js";

export const runSeed = async () => {
  try {
    console.log("🌱 Ejecutando seed en la base de datos...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(100),
        emoji VARCHAR(10),
        favorite BOOLEAN DEFAULT false,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insertar usuario de prueba si no existe
    await pool.query(`
      INSERT INTO users (email, password)
      VALUES ('test@example.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8vQhV5pK5lY9fL8YyG1FQ0mYt5k5e6')
      ON CONFLICT (email) DO NOTHING;
    `);

    // Insertar nota de prueba asociada al usuario de prueba
    await pool.query(`
      INSERT INTO notes (user_id, title, content, category, emoji, favorite, completed)
      VALUES (
        (SELECT id FROM users WHERE email = 'test@example.com'),
        'Nota de ejemplo',
        'Este es el contenido de la nota de prueba.',
        'General',
        '📝',
        true,
        false
      )
      ON CONFLICT DO NOTHING;
    `);

    console.log("✅ Seed ejecutado correctamente");
  } catch (err) {
    console.error("❌ Error al ejecutar seed:", err.message);
  }
};
