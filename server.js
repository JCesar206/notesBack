import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import { pool } from "./db.js"; // conexión a la DB

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// 🔹 Verificar conexión con DB al arrancar
const testDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Conectado a la DB:", res.rows[0]);
  } catch (error) {
    console.error("❌ Error al conectar con la DB:", error.message);
  }
};
testDB();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend funcionando correctamente" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
