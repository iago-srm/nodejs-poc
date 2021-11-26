import {
  IDatabase,
  IBaseCollection,
} from "@/src/adapters/repositories/base-repository";
import { createConnection, Connection, Repository } from "typeorm";
export class TypeORMDatabase implements IDatabase {
  connection: Connection;

  async connect() {
    try {
      this.connection = await createConnection();
      return true;
    } catch {
      return false;
    }
  }

  async close() {
    try {
      await this.connection.close();
      return true;
    } catch {
      return false;
    }
  }

  getCollection(collectionName: string): TypeORMCollection {
    const repository = this.connection.getRepository(collectionName);
    return repository;
  }
}

class TypeORMCollection implements IBaseCollection {
  constructor(private repository: Repository) {}

  getOne<P>(id: string) {
    return new Promise<P>((resolve) =>
      resolve(this.data.find((el) => el.id === id))
    );
  }

  getAll<P>() {
    return new Promise<P>((resolve) => resolve(this.data));
  }

  insertOne<P>(data) {
    this.data.push(data);
    return new Promise<P>((resolve) => resolve(data));
  }
}
