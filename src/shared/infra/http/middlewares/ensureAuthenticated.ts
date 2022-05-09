import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import CheckPermissionService from '@modules/users/services/CheckPermissionService';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<boolean | void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT token missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;
    const [user_id, role_id, client_application_id] = sub.split('#');
    request.user = {
      id: Number(user_id),
      role_id: Number(role_id),
      client_application_id: Number(client_application_id),
    };
    httpContext.set('user', request.user);
  } catch {
    throw new AppError('Invaid JWT token', 401);
  }

  let authorized = false;
  const { originalUrl, method } = request;
  if (!originalUrl.includes('dataTable')) {
    const checkPermission = container.resolve(CheckPermissionService);
    authorized = await checkPermission.execute({
      user_id: Number(request.user.id),
      role_id: Number(request.user.role_id),
      method,
      originalUrl,
    });
  } else {
    authorized = true;
  }

  if (authorized) {
    return next();
  }
  throw new AppError('Not authorized!', 403);
}
