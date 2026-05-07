import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import { syncStories } from './controllers/scrapeController.js';

const startServer = async () => {
  const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
  const missingEnv = requiredEnv.filter((env) => !process.env[env]);

  if (missingEnv.length > 0) {
    console.error(`[Server] Missing environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
  }

  try {
    await connectDB();

    await syncStories();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`[Server] running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`[Server] Failed to start: ${error.message}`);
    process.exit(1);
  }
};

startServer();
