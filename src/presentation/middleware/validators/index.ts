import { body } from "express-validator";
import { MessageNames } from "@locales";

export const getEmailValidator = () => {
  return body("email")
    .exists()
    .withMessage(MessageNames.EMAIL.NOT_PROVIDED)
    .bail()
    .notEmpty()
    .withMessage(MessageNames.EMAIL.NULL)
    .bail()
    .isEmail()
    .withMessage(MessageNames.EMAIL.INVALID_PATTERN);
};

/**
 * other password pattern regexes:
 * https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 */
const passMinLength = 6;
export const getPasswordValidator = () =>
  body("password")
    .exists()
    .withMessage(MessageNames.PASSWORD.NOT_PROVIDED)
    .bail()
    .notEmpty()
    .withMessage(MessageNames.PASSWORD.NULL)
    .bail()
    .trim()
    .isLength({ min: passMinLength, max: 32 })
    .withMessage(MessageNames.PASSWORD.INVALID_LENGTH)
    .bail()
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .withMessage(MessageNames.PASSWORD.INVALID_PATTERN);

export const getConfirmPasswordValidator = () => {
  return body("confirmPassword")
    .exists()
    .withMessage(MessageNames.CONFIRMPASSWORD.NOT_PROVIDED)
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(MessageNames.CONFIRMPASSWORD.DOES_NOT_MATCH);
      }
      return true;
    });
};

export const getUsernameValidator = (required = false) => {
  return required
    ? body("username")
        .exists()
        .withMessage(MessageNames.USERNAME.NOT_PROVIDED)
        .bail()
        .notEmpty()
        .withMessage(MessageNames.USERNAME.NULL)
        .bail()
        .isLength({ min: 4, max: 32 })
        .withMessage(MessageNames.USERNAME.INVALID_LENGTH)
    : body("username").optional();
};

export const getRoleValidator = () => {
  return body("isAdmin")
    .optional()
    .isBoolean()
    .withMessage(MessageNames.ROLE.INVALID_PATTERN);
};
