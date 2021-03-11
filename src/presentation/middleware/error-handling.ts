import { RequestHandler, ErrorRequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (req, _, next) => {
  const error = new Error(
    `${req.ip} tried to access ${req.originalUrl}`,
  );

  req.statusCode = 404;

  next(error);
}

export const generalErrorHandler: ErrorRequestHandler = (error, req, res, _) => {
  if (!req.statusCode) req.statusCode = 500;

  return res
    .status(req.statusCode)
    .json({ error: error.toString() });
}