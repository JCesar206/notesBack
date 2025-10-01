// src/routes/notes.routes.js
import { Router } from "express";
import { getNotes, addNote } from "../controllers/notes.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, addNote);

export default router;