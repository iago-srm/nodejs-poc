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

  async getOne<P>(table: string, where: any): Promise<P> {
    const repository = this.connection.getRepository(table);
    return repository.findOne(where) as Promise<P>
  }
  
  async getAll<P>(table: string): Promise<P[]> {
    const repository = this.connection.getRepository(table);
    return repository.find() as Promise<P[]>
  }

  async insert(table: string, entry: any): Promise<void> {
    return this.connection.getRepository(table).save(entry);
  }

  async update(table: string, entry: any): Promise<void> {
    return this.connection.getRepository(table).save(entry);
  }
}