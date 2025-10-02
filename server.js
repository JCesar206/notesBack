import express from "express";
import cors from "cors";
import { runSeed } from "./seed.js";  // importamos el seed
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import debugRoutes from "./routes/debug.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/debug", debugRoutes);

// endpoint base
app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando con seed automático en Render");
});

// ejecutar seed automáticamente al iniciar
runSeed();

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto ${PORT}`);
});
