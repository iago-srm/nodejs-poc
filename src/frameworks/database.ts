import { createConnection, Connection } from "typeorm";
import { __prod__ } from '../constants';
import { IDatabase } from '../domain/interfaces/database.interface';

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
  
  async getAll<P>(table: string): Promise<P[]> {
    const repository = this.connection.getRepository<P>(table);
    return repository.find()
  }

  async insertOne<P>(table: string, entry: P): Promise<P[]> {
    return this.connection.getRepository(table).save<P>([entry]);
  }

  async updateOne<P>(table: string, entry: P): Promise<P[]> {
    return this.connection.getRepository(table).save<P>([entry]);
  }
}