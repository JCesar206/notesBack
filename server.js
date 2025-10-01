import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
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
