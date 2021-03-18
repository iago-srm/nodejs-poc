import { Request } from 'express';
import { body, param, validationResult } from 'express-validator';
/**
 * .exists() to enforce a required field
 */
export const emailValidator = body('email').isEmail().withMessage('E-mail must be valid');
export const emailParamsValidator = param('email').isEmail().withMessage('E-mail must be valid');
export const passwordValidator = body('password').trim().isLength({ min: 5 }).withMessage('Password must be valid');
export const usernameValidator = body('username').exists().withMessage('No username was provided').not().isEmpty().withMessage('No username was provided');
export const getErrors = (req: Request) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) return [];
  return errors.array()
}