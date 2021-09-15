import { testContainer, Dependencies } from "../containers";
import { Application } from "../app";
import { RedisProxy } from "@infrastructure";
import { User } from "@domain";

export const normalizeJsonArray = (arr: any[]) => {
  return arr.map((obj: any) => normalizeJson(obj));
};

export const normalizeJson = (obj: any) => {
  return JSON.parse(JSON.stringify({ ...obj }));
};

export const baseUrn = `/api/v1/users`;

export const testAppInstance: Application = testContainer.resolve(
  Dependencies.APP
) as Application;
export const testDbInstance: RedisProxy = testContainer.resolve(
  Dependencies.DB
);

export const insertUser = (users: User[]) => {
  return testDbInstance._connection.getRepository("users").save(users);
};

export const getUser = (email: string) => {
  return testDbInstance._connection
    .getRepository<User>("users")
    .find({ email });
};
