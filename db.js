// db.js
import pg from "pg";
const { Pool } = pg;

// Variables de entorno de Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Render requiere SSL
});

// Probar la conexión inmediatamente
pool.connect()
  .then(client => {
    console.log("✅ Conexión a la DB establecida correctamente");
    client.release();
  })
  .catch(err => {
    console.error("❌ Error al conectar a la DB:", err.message);
  });

export { pool };
