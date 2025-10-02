import { Router } from "express";
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.controller.js";
import jwt from "jsonwebtoken";

const router = Router();

router.use(authMiddleware); // protege todas las rutas de notas
router.get("/", getNotes);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
