import { RequestHandler, ErrorRequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (req, res, next) => {
  const error = `${req.ip} tried to access ${req.originalUrl}`;

  res.status(404);

  next(error);
}

/**
 * 
 * Expects either of the following types of error:
 * 1. String
 * 2. { msg, param }[]
 */
export const generalErrorHandler: ErrorRequestHandler = (error, __, res, _) => {
  if (!res.statusCode) res.status(500);
  console.log(error)
  if(Array.isArray(error)) {
    return res.send(error.map(e => {return { error: e.msg, param: e.param}}))
  }
  return res.json({ error: error.toString() });
}