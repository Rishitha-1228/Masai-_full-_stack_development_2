import express from 'express';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

export default app;
