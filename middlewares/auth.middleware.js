import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET no definido");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // información del usuario
    next();
  } catch (err) {
    console.error("Token inválido o expirado:", err.message);
    return res.status(401).json({ error: "Token inválido" });
  }
};