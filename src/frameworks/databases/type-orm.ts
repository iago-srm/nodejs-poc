import {
  IDatabase,
  IBaseCollection
} from "@/src/adapters/repositories/ibase-repository";
import { createConnection, Connection, Repository } from "typeorm";

export class TypeORMDatabase implements IDatabase {
  connection: Connection;

  async connect(connectionName: string) {
    try {
      this.connection = await createConnection(connectionName);
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

  getCollection<P>(collectionName: string): TypeORMCollectionAdapter<P> {
    const repository = this.connection.getRepository<P>(collectionName);
    return new TypeORMCollectionAdapter<P>(repository);
  }
}

class TypeORMCollectionAdapter<P> implements IBaseCollection<P> {
  constructor(private repository: Repository<P>) {}

  async getOneById(id: string) {
    if(!id) {
      throw Error("Null id was passed");
    }
    const response = await this.repository.findOneOrFail(id);
    return response;
  }

  getManyByIds(ids: string[]) {
    return this.repository.findByIds(ids) // does this fail if one id is not found?
  }

  getAll() {
    return this.repository.find();
  }

  async editOne(id: string, entity: P) {
    const result = await this.repository.update(id, entity);
    return (result.generatedMaps as P[])[0];
  }

  async insertOne(data: P) {
    const result = await this.repository.insert(data);
    return (result.generatedMaps as P[])[0];
  }
}
