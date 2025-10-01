import { db } from '../db.js';

export const getNotes = async (req, res) => {
  try {
    const { data, error } = await db.from('notes').select('*').eq('user_id', req.user.id);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error en getNotes:', err.message);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
};

export const addNote = async (req, res) => {
  try {
    const { title, content, category, favorite, completed } = req.body;
    const { error } = await db.from('notes').insert([{
      user_id: req.user.id,
      title,
      content,
      category,
      favorite,
      completed
    }]);
    if (error) throw error;
    res.json({ message: 'Nota agregada' });
  } catch (err) {
    console.error('Error en addNote:', err.message);
    res.status(500).json({ error: 'Error al agregar nota' });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, favorite, completed } = req.body;

    const { error } = await db.from('notes')
      .update({ title, content, category, favorite, completed })
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ message: 'Nota actualizada' });
  } catch (err) {
    console.error('Error en updateNote:', err.message);
    res.status(500).json({ error: 'Error al actualizar nota' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await db.from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);
    if (error) throw error;
    res.json({ message: 'Nota eliminada' });
  } catch (err) {
    console.error('Error en deleteNote:', err.message);
    res.status(500).json({ error: 'Error al eliminar nota' });
  }
};