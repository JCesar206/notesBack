import express from "express"; // Server principal
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Prefijo /api para separar del front
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Backend Notes API funcionando ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});