import express from 'express';
import cors from 'cors';
import notesRoutes from '../routes/notes.routes.js';

const app = express();
app.use(cors({ origin: 'https://jcesar206.github.io/notesFront' })); // Cambiar origin a tu front en producción
app.use(express.json());

app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));