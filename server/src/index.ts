import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Безопасное получение URL фронтенда
const frontendUrl = process.env.FRONTEND_URL || '';
const nodeEnv = process.env.NODE_ENV || 'development';

// Разрешенные домены для CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  frontendUrl, // URL фронтенда на Vercel
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '' // URL самого бэкенда
].filter(origin => origin && origin.trim() !== '');

// Middleware CORS
app.use(cors({
  origin: function (origin, callback) {
    // Разрешаем запросы без origin
    if (!origin) return callback(null, true);
    
    // Проверяем разрешенные origin
    const isAllowed = allowedOrigins.some(allowedOrigin => 
      origin.startsWith(allowedOrigin)
    );
    
    if (isAllowed) {
      return callback(null, true);
    }
    
    callback(new Error('CORS policy: Origin not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', routes);

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.o2c2sh9.mongodb.net/';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Export для Vercel serverless
export default app;

// Локальный запуск для разработки
if (nodeEnv !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Allowed CORS origins:', allowedOrigins);
  });
}