// src/routes/notes.routes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getNotes, createNote } from "../controllers/notes.controller.js";

const router = Router();

router.use(authMiddleware); // protege todas las rutas de notas
router.get("/", getNotes);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
