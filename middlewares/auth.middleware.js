import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No autorizado" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // información del usuario
    next();
  } catch (err) {
    console.error("Error en authMiddleware:", err.message);
    res.status(401).json({ error: "Token inválido" });
  }
};