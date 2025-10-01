// src/routes/notes.routes.js
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getNotes, createNote } from "../controllers/notes.controller.js";

const router = Router();

// todas las rutas de notas requieren token
router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, createNote);

export default router;