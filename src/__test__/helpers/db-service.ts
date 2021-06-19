import { testDbInstance } from "./instances";
import { User } from "@domain";

export const insertUser = (user: User) => {
  return testDbInstance._connection.getRepository("users").save([user]);
};

export const getUser = async (email: string) => {
  const users = await testDbInstance._connection
    .getRepository<User>("users")
    .find({ email });
  return users[0];
};
