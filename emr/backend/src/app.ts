import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { json } from 'body-parser';
import { errorHandler } from './middlewares/error.middleware';
import { registerRoutes } from './routes';

export function createApp() {
  const app = express();

  const corsOptions: cors.CorsOptions = {
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    credentials: true,
  };

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(json());

  registerRoutes(app);

  app.use(errorHandler);

  return app;
}
