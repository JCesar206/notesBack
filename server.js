import express from 'express';
import cors from 'cors';
import notesRoutes from '../routes/notes.routes.js';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cors({ origin: process.env.FRONT_URL }));

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));