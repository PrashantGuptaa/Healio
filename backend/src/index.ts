import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/database';
import logger from './config/logger';
import swaggerSpec from './config/swagger';
import morganMiddleware from './middleware/morgan.middleware';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import foodRoutes from './routes/food.routes';
import mealRoutes from './routes/meal.routes';
import bmiRoutes from './routes/bmi.routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
app.use(morganMiddleware);

// Connect to MongoDB
connectDB();

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Healio API Documentation',
}));

// Swagger JSON
app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/bmi', bmiRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Healio API is running' });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Healio server is running on port ${PORT}`);
  logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  logger.info(`🔐 Google Auth: ${process.env.ENABLE_GOOGLE_AUTH === 'true' ? 'Enabled' : 'Disabled'}`);
});

export default app;
