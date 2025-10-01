// src/controllers/notes.controller.js
export const getNotes = async (req, res) => {
  try {
    // user viene del token
    const userId = req.user.id;

    // ejemplo usando supabase
    const { data, error } = await req.db
      .from("notes")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Error fetching notes" });
  }
};

export const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    const { data, error } = await req.db
      .from("notes")
      .insert([{ title, content, user_id: userId }])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ message: "Error creating note" });
  }
};