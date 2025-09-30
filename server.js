import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" })); // o limitar a tu front deploy
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));