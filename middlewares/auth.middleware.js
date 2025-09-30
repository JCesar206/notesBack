import { supabase } from "../db.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>..

    // Obtener usuario desde el token
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    req.user = data.user; // guardamos el usuario en la request
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};