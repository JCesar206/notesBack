// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import notesRoutes from './src/routes/notes.routes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' })); // permitir front
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
s