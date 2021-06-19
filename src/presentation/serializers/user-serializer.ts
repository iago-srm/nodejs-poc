import { User } from "../../domain";

export const userSerializer = (payload: any) => {
  const id = payload.id;
  const email = payload.email;
  const nickName = payload.nickName;
  const isAdmin = payload.isAdmin;
  const isPremium = payload.isPremium;
  const tokenVersion = payload.tokenVersion;
  const profileUrl = payload.profilePictureUrl;
  const password = payload.password;

  const user = new User();

  user.id = id;
  user.email = email;
  user.nickName = nickName;
  user.isAdmin = isAdmin;
  user.isPremium = isPremium;
  user.tokenVersion = tokenVersion;
  user.profilePictureUrl = profileUrl;
  user.password = password;

  return user;
};
