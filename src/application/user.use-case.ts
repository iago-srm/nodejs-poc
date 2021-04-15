import { User } from '../domain';
import { dbWithCache } from '../infrastructure';

const tableName = 'users';

export const getUser = (email: string) => dbWithCache.getOne<User>(tableName, { email });
export const getAllUsers = () => dbWithCache.getAll<User>(tableName);
export const insertUser = (user: User | User[]) => dbWithCache.insert<User>(tableName, user);
export const updateUser = ({ email, password } : { email: string, password: string }) => 
    dbWithCache.updateOne<User>(tableName, { email }, { password });
export const deleteUser = ({ email }: { email: string }) => dbWithCache.delete<User>(tableName, { email });
