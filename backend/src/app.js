import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
