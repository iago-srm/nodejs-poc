import { User } from "../../domain";

export const userSerializer = (payload: any) => {
  const email = payload.email;
  const password = payload.password;
  const username = payload.username;
  const role = payload.role;

  const user = new User();

  user.email = email;
  user.password = password;
  user.username = username;
  user.role = role;

  return user;
};
