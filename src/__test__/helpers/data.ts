import * as helpers from "@iagosrm/common";
import { User } from "../../domain";

export const normalizeJsonArray = (arr: any[]) => {
  return arr.map((obj: any) => normalizeJson(obj));
};

export const normalizeJson = (obj: any) => {
  return JSON.parse(JSON.stringify({ ...obj }));
};

export const getValidRandomPassword = () =>
  "a".repeat(Math.random() * 8 + 5) +
  "A".repeat(Math.random() * 8 + 5) +
  "8787";

export const getMockUser = () => {
  const testUser = new User();

  testUser.email = helpers.getRandomEmail();
  testUser.nickName = helpers.getRandomString(10);
  testUser.password = getValidRandomPassword();
  testUser.tokenVersion = 0;
  testUser.isAdmin = false;
  testUser.isPremium = true;
  testUser.profilePictureUrl = helpers.getRandomString(100);

  return testUser;
};
