import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Безопасное получение URL фронтенда
const nodeEnv = process.env.NODE_ENV || 'development';

// Разрешенные домены для CORS
const allowedOrigins = [
  process.env.FRONT_URL ? `https://${process.env.FRONT_URL}` : '' // URL самого бэкенда
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
const mongoURI = process.env.MONGODB_URI || '';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Export для Render
export default app;

// Локальный запуск для разработки
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Allowed CORS origins:', allowedOrigins);
});