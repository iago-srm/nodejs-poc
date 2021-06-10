import { User } from "@domain";
import { IDatabase } from "@infrastructure";

const tableName = "users";
export const UserUseCase = (db: IDatabase) => {
  return {
    getUser: (email: string) => db.getOne<User>(tableName, { email }),
    getAllUsers: () => db.getAll<User>(tableName),
    insertUser: (user: User | User[]) => db.insert<User>(tableName, user),
    updateUser: ({ email, password }: { email: string; password: string }) =>
      db.updateOne<User>(tableName, { email }, { password }),
    deleteUser: ({ email }: { email: string }) =>
      db.delete(tableName, { email }),
  };
};

export type IUserUseCase = ReturnType<typeof UserUseCase>;
