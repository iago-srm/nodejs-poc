import { User } from '../domain';
import { IDatabase } from '../domain';

export const UserUseCase = (db: IDatabase) => {

  const getUser = async (where: any) => await db.getOne<User>('user', where);
  const getAllUsers = async () => await db.getAll<User>('user');
  const insertUser = async (user: User) => db.insert('user', user);
  const updateUser = async (user: User) => db.update('user', user);

  return {
    getUser,
    getAllUsers,
    insertUser,
    updateUser
  }
}