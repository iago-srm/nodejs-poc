import { DatabaseError } from "../presentation/errors";
import { createConnection, Connection } from "typeorm";
import { __prod__ } from '../constants';
import { IDatabase } from '../domain/interfaces/database.interface';

export const getDatabaseError = (e: any) => {
  if(e.code === '23505') {
    return
  }
};
export class Database implements IDatabase {
  
  connection: Connection;

  async init () {
    this.connection = await createConnection();

    // goes to the migrations folder and builds the db
    this.connection.runMigrations()
  }

  async getOne<P>(table: string, where: any) {
    const repository = this.connection.getRepository<P>(table);
    return repository.findOne(where);
  }
  
  async getAll<P>(table: string) {
    const repository = this.connection.getRepository<P>(table);
    return repository.find()
  }

  async insertOne<P>(table: string, entry: P) {
    const repository = this.connection.getRepository(table);
    try {
      return await repository.save<P>([entry])
    } catch (e){
      if (e.code === '23505') {
        throw new DatabaseError(`Objeto com a mesma chave única já existe. ${e.detail}`, 409);
      } throw new DatabaseError();
    }
  }

  async updateOne<P>(table: string, entry: P): Promise<P> {
    return this.connection.getRepository(table).save<P>(entry);
  }
}