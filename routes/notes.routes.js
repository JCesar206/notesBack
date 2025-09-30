import { Router } from "express";
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware); // todas las rutas protegidas

router.get("/", getNotes);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;