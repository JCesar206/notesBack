import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

dotenv.config();
const app = express();

const whitelist = [process.env.FRONTEND_URL];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman / server-to-server
    if (whitelist.includes(origin)) return callback(null, true);
    return callback(new Error("CORS denied"));
  }
}));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// health
app.get("/health", (req, res) => res.json({ ok: true }));
// server main
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en: ${PORT}`));
