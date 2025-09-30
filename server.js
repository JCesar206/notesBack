import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" })); // o limitar a tu front deploy
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));