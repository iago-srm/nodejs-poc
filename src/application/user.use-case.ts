import { User } from "@domain";
import { IDatabase } from "@infrastructure";
import { encrypt, compare } from "./encrypt";

export const usersTableName = "users";
export const UserUseCase = (db: IDatabase) => {
  return {
    getUserById: (user: User) =>
      db.getOne<User>(usersTableName, {
        id: user.id,
      }),
    getAllUsers: () => db.getAll<User>(usersTableName),
    getUserByEmailAndPassword: async (user: User) => {
      const retrievedUser = await db.getOne<User>(usersTableName, {
        email: user.email,
      });
      if (retrievedUser) {
        const validatePassword = await compare(
          user.password,
          retrievedUser.password
        );
        if (validatePassword) {
          return retrievedUser;
        }
        return undefined;
      }
      return undefined;
    },
    insertUser: async (user: User) => {
      const hashedUser = {
        ...user,
        password: await encrypt(user.password),
      };
      return db.insert<User>(usersTableName, hashedUser);
    },
    // updateUser: ({ id, password }: { id: string; password: string }) =>
    //   db.updateOne<User>(tableName, id, { password }),
  };
};

export type IUserUseCase = ReturnType<typeof UserUseCase>;
