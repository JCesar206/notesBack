import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

dotenv.config();

const app = express();

// ✅ Configuración de CORS
app.use(
  cors({
    origin: ["https://jcesar206.github.io"], // tu frontend en GitHub Pages
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.json());

// Rutas con prefijo /api
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Arranque del servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});