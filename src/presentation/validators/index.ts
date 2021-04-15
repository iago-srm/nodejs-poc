import { body, param } from 'express-validator';
import { UserMessageNames } from '../../locales';

export const emailValidator = (where: 'body' | 'params' = 'body') => {
  const root = where === 'body' ? body('email') : param('email');
  return root.exists().withMessage(UserMessageNames.EMAIL.NOT_PROVIDED).bail()
    .notEmpty().withMessage(UserMessageNames.EMAIL.NULL).bail()
    .isEmail().withMessage(UserMessageNames.EMAIL.INVALID_PATTERN);
}

/**
 * other password pattern regexes:
 * https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 */
const passMinLength = 6;
export const passwordValidator = () => body('password').exists().withMessage(UserMessageNames.PASSWORD.NOT_PROVIDED)
.bail().notEmpty().withMessage(UserMessageNames.PASSWORD.NULL)
.bail().trim().isLength({ min: passMinLength, max: 32 })
.withMessage(UserMessageNames.PASSWORD.INVALID_LENGTH).bail()
.trim().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
.withMessage(UserMessageNames.PASSWORD.INVALID_PATTERN);

export const usernameValidator = (required = false) => {
  const root = required ? body('username').exists().withMessage(UserMessageNames.USERNAME.NOT_PROVIDED).bail()
    : body('username');
  return root.notEmpty().withMessage(UserMessageNames.USERNAME.NULL).bail()
    .isLength({ min: 4, max: 32 }).withMessage(UserMessageNames.USERNAME.INVALID_LENGTH);
};