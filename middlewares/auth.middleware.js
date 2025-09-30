import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "No autorizado. Falta token." });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Token inválido o ausente." });
    }

    // Verificamos el token con la secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardamos los datos en la request
    next();
  } catch (err) {
    console.error("Error en authMiddleware:", err.message);
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
};