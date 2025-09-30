import { Router } from "express";
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Rutas protegidas de notas
router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, addNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;