import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Безопасное получение URL фронтенда
const frontendUrl = process.env.FRONTEND_URL || '';
const nodeEnv = process.env.NODE_ENV || 'development';

// Разрешенные домены для CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  frontendUrl,
  'https://flower-delivery-app-qrfm.vercel.app/'
].filter(origin => origin && origin.trim() !== '');

// Middleware CORS
app.use(cors({
  origin: '*', // Разрешить все домены
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', routes);

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MONGODB_URI is required');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Локальный запуск для разработки
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Allowed CORS origins:', allowedOrigins);
  console.log('Environment:', nodeEnv);
});

export default app;