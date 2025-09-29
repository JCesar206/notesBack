import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();

// Middleware para JSON
app.use(express.json());

// Configurar CORS
const FRONTEND_URL = process.env.FRONTEND_URL || "https://jcesar206.github.io/notesFront/";

app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Conexión a DB
db.getConnection((err) => {
  if (err) {
    console.error("Error connecting to DB:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});