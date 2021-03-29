import { User } from '../domain';
import { db } from '../infrastructure/get-db';

export const getUser = async (email: string) => await db.getOne<User>('user', { email });
export const getAllUsers = async () => await db.getAll<User>('user');
export const insertUser = async (user: User) => db.insertOne<User>('user', user);
export const updateUser = async ({email, password} : {email: string, password: string}) => 
    db.updateOne<User>('user', { email }, { password });
