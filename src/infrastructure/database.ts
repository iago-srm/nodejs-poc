import { DatabaseError } from "@iagosrm/common";
import { createConnection, Connection } from "typeorm";

export class Database {
  
  _connection: Connection;

  async init (connection: string) {
    this._connection = await createConnection(connection);
  }

  closeConnection() {
    return this._connection.close();
  }

  async getOne<P>(table: string, where: any) {
    try {
      return this._connection.getRepository<P>(table).findOne(where);
    } catch {
      throw new DatabaseError();
    }
  }
  
  async getAll<P>(table: string) {
    try{
      return this._connection.getRepository<P>(table).find();
    } catch {
      throw new DatabaseError();
    }
  }

  async insert<P>(table: string, entry: P | P[]) {
    try {
      const repository = this._connection.getRepository(table);
      const result = Array.isArray(entry) ? await repository.save<P>(entry) : await repository.save<P>([entry]);
      return result;
    } catch (e){
      if (e.code === '23505') {
        throw new DatabaseError(`Objeto com a mesma chave única já existe. ${e.detail}`, 409);
      } throw new DatabaseError();
    }
  }

  async updateOne<P>(table: string, criterium: {[field: string]: string}, entity: Partial<P>) {
    try{
      return this._connection.getRepository(table).update(criterium, entity);
    } catch {
      throw new DatabaseError();
    }
  }

  deleteAll() {
    try {
      const tables = this._connection.entityMetadatas;
      const promises = tables.map(async t => {
        await this._connection.getRepository(t.tableName).query(`DELETE FROM ${t.tableName};`)
      });
      return Promise.all(promises);
    } catch {
      throw new DatabaseError();
    }
  }

  async delete<P>(table: string, criterium: any) {
    try {
      const result = await this._connection.getRepository<P>(table).delete(criterium);
      return result.affected;
    } catch {
      throw new DatabaseError();
    }
  }
}
