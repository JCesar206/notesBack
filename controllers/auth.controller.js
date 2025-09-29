import supabase from '../db.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Verificar si existe usuario
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }]);

    if (insertError) throw insertError;

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('❌ Error en register:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: 'Usuario o contraseña inválidos' });
    }

    // Validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Usuario o contraseña inválidos' });
    }

    res.status(200).json({ message: 'Login exitoso', user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('❌ Error en login:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};