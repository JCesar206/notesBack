// src/server.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

const app = express();

// CORS config
const allowedOrigins = [
  "http://localhost:5173", // Vite local
  "https://jcesar206.github.io/notesFront" // tu GitHub Pages
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Healthcheck
app.get("/", (req, res) => {
  res.send("API Notes running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));