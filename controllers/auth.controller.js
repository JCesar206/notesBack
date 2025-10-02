import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

export const register = async (req, res) => {
  try {
    console.log("📥 Datos recibidos en register:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("⚠️ Falta email o password");
      return res.status(400).json({ error: "Faltan datos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    console.log("✅ Usuario creado:", result.rows[0]);

    res.json({ message: "Usuario registrado", user: result.rows[0] });
  } catch (error) {
    console.error("❌ Error en register:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    console.log("📥 Datos recibidos en login:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("⚠️ Falta email o password");
      return res.status(400).json({ error: "Faltan datos" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      console.log("❌ Usuario no encontrado");
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password incorrecta");
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("✅ Login exitoso, token generado");

    res.json({ token });
  } catch (error) {
    console.error("❌ Error en login:", error.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
