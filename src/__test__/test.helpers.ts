import { container as testContainer, Dependencies } from "../containers";
import { Application } from "../app";
import { User } from "@domain";
import { Database } from "@infrastructure";

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
const testDbInstance: Database = testContainer.resolve(Dependencies.DB);

export const start = () => {
  return testAppInstance.start();
};

export const deleteAll = () => {
  return testDbInstance.deleteAll();
};

export const insertUser = (users: User[]) => {
  return testDbInstance._connection.getRepository("users").save(users);
};

export const getUser = (email: string) => {
  return testDbInstance._connection
    .getRepository<User>("users")
    .find({ email });
};
