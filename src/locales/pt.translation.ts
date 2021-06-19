import { MessageNames } from "./messages.enum";

// TODO: translate these
export const Portuguese = {
  [MessageNames.USERNAME.NOT_PROVIDED]: "A username must be provided.",
  [MessageNames.USERNAME.NULL]: "PT Username cannot be null or empty.",
  [MessageNames.USERNAME.INVALID_LENGTH]:
    "Must have min 4 and max 32 characters.",
  [MessageNames.EMAIL.NOT_PROVIDED]: "An e-mail must be provided.",
  [MessageNames.EMAIL.NULL]: "E-mail cannot be null.",
  [MessageNames.EMAIL.INVALID_PATTERN]: "PT E-mail is not valid.",
  [MessageNames.PASSWORD.NOT_PROVIDED]: "A password must be provided.",
  [MessageNames.PASSWORD.NULL]: "Password cannot be null.",
  [MessageNames.PASSWORD.INVALID_LENGTH]:
    "Password must be between 6 and 32 characters.",
  [MessageNames.PASSWORD.INVALID_PATTERN]:
    "PT Password must have at least 1 uppercase, 1 lowercase letter and 1 number.",
  [MessageNames.ROLE.INVALID_PATTERN]: "Este papel de usuário não existe.",
  [MessageNames.CONFIRMPASSWORD.NOT_PROVIDED]:
    "Favor fornecer uma confirmação de senha.",
};
