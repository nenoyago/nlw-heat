import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

const errorHandler: ErrorRequestHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.objectError.status_code).json({
      error: true,
      code: error.objectError.code,
      message: error.objectError.message,
    });
  }

  return response.status(500).json({
    error: true,
    message: `Internal server error - ${error.message}`,
  });
};

export default errorHandler;
