import { body, param } from "express-validator";
import { UserMessageNames } from "../../locales";
import { UserRole } from "@domain";

export const getEmailValidator = (where: "body" | "params" = "body") => {
  const root = where === "body" ? body("email") : param("email");
  return root
    .exists()
    .withMessage(UserMessageNames.EMAIL.NOT_PROVIDED)
    .bail()
    .notEmpty()
    .withMessage(UserMessageNames.EMAIL.NULL)
    .bail()
    .isEmail()
    .withMessage(UserMessageNames.EMAIL.INVALID_PATTERN);
};

/**
 * other password pattern regexes:
 * https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 */
const passMinLength = 6;
export const getPasswordValidator = () =>
  body("password")
    .exists()
    .withMessage(UserMessageNames.PASSWORD.NOT_PROVIDED)
    .bail()
    .notEmpty()
    .withMessage(UserMessageNames.PASSWORD.NULL)
    .bail()
    .trim()
    .isLength({ min: passMinLength, max: 32 })
    .withMessage(UserMessageNames.PASSWORD.INVALID_LENGTH)
    .bail()
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .withMessage(UserMessageNames.PASSWORD.INVALID_PATTERN);

export const getUsernameValidator = (required = false) => {
  return required
    ? body("username")
        .exists()
        .withMessage(UserMessageNames.USERNAME.NOT_PROVIDED)
        .bail()
        .notEmpty()
        .withMessage(UserMessageNames.USERNAME.NULL)
        .bail()
        .isLength({ min: 4, max: 32 })
        .withMessage(UserMessageNames.USERNAME.INVALID_LENGTH)
    : body("username").optional();
};

export const getRoleValidator = () => {
  return body("role")
    .optional()
    .custom((value) => value === UserRole.ADMIN || value === UserRole.COMMON)
    .withMessage(UserMessageNames.ROLE.INVALID_PATTERN);
};
