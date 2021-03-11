import { User } from "../../domain";

export const userSerializer = (payload: any) => {
  const email = payload.email;
  const password = payload.password;
  const username = payload.username;

  const user = new User();
  
  user.email = email;
  user.password = password;
  user.username = username;

  return user;
}