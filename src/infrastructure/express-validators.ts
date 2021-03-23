import { Request } from 'express';
import { body, param, validationResult } from 'express-validator';
// TODO: intl these validation messages
/**
 * .exists() to enforce a required field
 */
export const emailValidator = body('email').isEmail().withMessage('E-mail must be valid');
export const emailParamsValidator = param('email').isEmail().withMessage('E-mail must be valid');
export const existingPasswordValidator = body('password').trim().withMessage('Password must be provided');
export const newPasswordValidator = body('password').trim().isLength({ min: 5 }).withMessage('Password must be valid');
export const usernameValidator = body('username').exists().withMessage('No username was provided').not().isEmpty().withMessage('No username was provided');
export const getErrors = (req: Request) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) return [];
  return errors.array()
}