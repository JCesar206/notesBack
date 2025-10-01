import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => res.send('API funcionando'));

export default app;