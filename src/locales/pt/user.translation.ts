import { UserMessageNames } from "../messages.enum";

// TODO: translate these
export const Portuguese = {
  [UserMessageNames.USERNAME.NOT_PROVIDED]: "A username must be provided.",
  [UserMessageNames.USERNAME.NULL]: "PT Username cannot be null or empty.",
  [UserMessageNames.USERNAME.INVALID_LENGTH]:
    "Must have min 4 and max 32 characters.",
  [UserMessageNames.EMAIL.NOT_PROVIDED]: "An e-mail must be provided.",
  [UserMessageNames.EMAIL.NULL]: "E-mail cannot be null.",
  [UserMessageNames.EMAIL.INVALID_PATTERN]: "PT E-mail is not valid.",
  [UserMessageNames.PASSWORD.NOT_PROVIDED]: "A password must be provided.",
  [UserMessageNames.PASSWORD.NULL]: "Password cannot be null.",
  [UserMessageNames.PASSWORD.INVALID_LENGTH]:
    "Password must be between 6 and 32 characters.",
  [UserMessageNames.PASSWORD.INVALID_PATTERN]:
    "PT Password must have at least 1 uppercase, 1 lowercase letter and 1 number.",
  [UserMessageNames.ROLE.INVALID_PATTERN]: "Este papel de usuário não existe.",
};
