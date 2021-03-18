import { ErrorRequestHandler } from 'express';
import { CustomError } from '../errors';

export const errorHandler: ErrorRequestHandler = (error, __, res, _) => {

  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({ errors: error.serializeErrors() });
  }

  return res.status(500).send({
    errors: [{ message: error.toString() }]
  });
}