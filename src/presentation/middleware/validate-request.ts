import { Request, Response, NextFunction } from 'express';
import { getErrors } from '../../infrastructure';
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const errors: any[] = getErrors(req);
  if (errors.length) {
    throw new RequestValidationError(errors);
  }
  next();
};
