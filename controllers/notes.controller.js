import supabase from '../db.js';

export const getNotes = async (req, res) => {
  try {
    const { data, error } = await supabase.from('notes').select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Error en getNotes:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    if (!title || !content || !user_id) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const { error } = await supabase
      .from('notes')
      .insert([{ title, content, user_id }]);

    if (error) throw error;

    res.status(201).json({ message: 'Nota creada con éxito' });
  } catch (err) {
    console.error('❌ Error en createNote:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('notes').delete().eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Nota eliminada con éxito' });
  } catch (err) {
    console.error('❌ Error en deleteNote:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};