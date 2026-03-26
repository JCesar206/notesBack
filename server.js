import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import { runSeed } from "./seed.js";
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

app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando correctamente");
});

const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ DB conectada");
    client.release();

    await runSeed();

    app.listen(PORT, () => {
      console.log(`✅ Servidor en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error crítico al iniciar:", err.message);
    process.exit(1);
  }
};

startServer();