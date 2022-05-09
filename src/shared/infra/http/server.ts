import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimit from '@shared/infra/http/middlewares/rateLimiter';
import swaggerUI from 'swagger-ui-express';
import routes from './routes';
import swaggerDocs from './swagger.json';

import '@shared/infra/typeorm';
import '@shared/contanier';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimit);
app.use(httpContext.middleware);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333!');
});
