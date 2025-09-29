import express from 'express';
import { db } from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No autorizado' });

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Listar notas del usuario
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [notes] = await db.execute('SELECT * FROM notes WHERE user_id = ?', [req.user.id]);
    res.json(notes);
  } catch {
    res.status(500).json({ error: 'Error al obtener notas' });
  }
});

// Agregar nota
router.post('/', authMiddleware, async (req, res) => {
  const { title, content, category, favorite, completed } = req.body;
  try {
    await db.execute(
      'INSERT INTO notes (title, content, category, favorite, completed, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, content, category, favorite ? 1 : 0, completed ? 1 : 0, req.user.id]
    );
    res.json({ message: 'Nota agregada' });
  } catch {
    res.status(500).json({ error: 'Error al agregar nota' });
  }
});

// Editar nota
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, content, category, favorite, completed } = req.body;
  try {
    await db.execute(
      'UPDATE notes SET title=?, content=?, category=?, favorite=?, completed=? WHERE id=? AND user_id=?',
      [title, content, category, favorite ? 1 : 0, completed ? 1 : 0, id, req.user.id]
    );
    res.json({ message: 'Nota actualizada' });
  } catch {
    res.status(500).json({ error: 'Error al actualizar nota' });
  }
});

// Eliminar nota
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM notes WHERE id=? AND user_id=?', [id, req.user.id]);
    res.json({ message: 'Nota eliminada' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar nota' });
  }
});

export default router;