import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API running successfully'
  });
});

export default app;
