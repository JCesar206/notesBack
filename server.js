import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Prefijo API en todas las rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Ruta base para verificar que el server está corriendo
app.get("/", (req, res) => {
  res.send("✅ API funcionando en Render + Supabase con prefijo /api");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});