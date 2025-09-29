import { Router } from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/notes.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// Protegemos todas las rutas de notas con autenticación
router.use(authenticate);

router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;