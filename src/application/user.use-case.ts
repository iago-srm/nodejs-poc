import { User } from '../domain';
import { IDatabase } from '../domain';

export const UserUseCase = (db: IDatabase) => {

  const getUser = async (email: string) => await db.getOne<User>('user', { email });
  const getAllUsers = async () => await db.getAll<User>('user');
  const insertUser = async (user: User) => db.insertOne<User>('user', user);
  const updateUser = async ({email, password} : {email: string, password: string}) => 
    db.updateOne<User>('user', { email }, { password });

  return {
    getUser,
    getAllUsers,
    insertUser,
    updateUser
  }
}