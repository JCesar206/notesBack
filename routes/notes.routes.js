import { Router } from "express"; // Notas
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.controller.js";

const router = Router();

router.get("/", getNotes);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;