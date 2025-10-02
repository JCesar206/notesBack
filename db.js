// db.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DB_URL;

if (!connectionString) {
  console.error("❌ No se encontró la variable DATABASE_URL");
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Render exige SSL
  },
});

// Probar conexión inmediatamente
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Conexión a la DB exitosa");
    client.release();
  } catch (err) {
    console.error("❌ Error al conectar a la DB:", err.message);
  }
})();
