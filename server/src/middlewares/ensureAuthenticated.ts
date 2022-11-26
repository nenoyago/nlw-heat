import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppError';
import { verifyToken } from '../utils/jwt';

export function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError({
      status_code: 401,
      code: 'invalid.token',
      message: 'Invalid token',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub: user_id } = verifyToken(token);

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError({
      message: 'Token inválido',
      code: 'token.expired',
      status_code: 401,
    });
  }
}
