import { pool } from "./db.js";
import bcrypt from "bcryptjs";

export const runSeed = async () => {
  try {
    console.log("🌱 Ejecutando seed en la base de datos...");

    // Crear tablas
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

    // 🔥 Generar hash dinámicamente
    const hashedPassword = await bcrypt.hash("123456", 10);
    console.log("🔐 Hash generado correctamente");

    // Insertar o actualizar usuario
    await pool.query(
      `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      ON CONFLICT (email)
      DO UPDATE SET password = EXCLUDED.password;
      `,
      ["test@example.com", hashedPassword]
    );

    // Insertar nota de ejemplo
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