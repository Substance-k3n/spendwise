import type { ApiErrorBody } from '@spendwise/shared';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error';

/** Any route that doesn't exist ends up here. */
export const notFound: RequestHandler = (req, _res, next) => {
  next(new AppError(404, 'NOT_FOUND', `Route ${req.method} ${req.originalUrl} not found`));
};

/** Turns every thrown error into the shared ApiErrorBody shape. Must be registered last. */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let status = 500;
  let body: ApiErrorBody = {
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' },
  };

  if (err instanceof AppError) {
    status = err.statusCode;
    body = { error: { code: err.code, message: err.message, details: err.details } };
  } else if (err instanceof ZodError) {
    status = 400;
    body = {
      error: { code: 'VALIDATION_ERROR', message: 'Invalid request', details: err.issues },
    };
  } else {
    console.error(err);
  }

  res.status(status).json(body);
};
