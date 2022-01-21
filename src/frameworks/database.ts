import { DatabaseError } from "@iagosrm/common";
import { createConnection, Connection, UpdateResult } from "typeorm";
// import { IDatabase } from "@domain";

export interface IDatabase {
  _connection: any;
  dbConnectionName: string;
  init: () => Promise<void>;
  closeConnection: () => Promise<void>;
  getOne: <P>(table: string, where: any) => Promise<P | undefined>;
  getAll: <P>(table: string) => Promise<P[]>;
  insert: <P>(table: string, entry: P | P[]) => Promise<P[]>;
  updateOne: <P>(
    table: string,
    criterium: { [field: string]: string },
    entity: Partial<P>
  ) => Promise<UpdateResult>;
  delete: (table: string, criterium: any) => Promise<number | null | undefined>;
  deleteAll: () => Promise<void[]>;
}

export interface DatabaseParams {
  dbConnectionName: string;
}

export class Database implements IDatabase {
  _connection: Connection;
  dbConnectionName: string;

  constructor({ dbConnectionName }: DatabaseParams) {
    this.dbConnectionName = dbConnectionName;
  }

  async init() {
    this._connection = await createConnection(this.dbConnectionName);
  }

  closeConnection() {
    return this._connection.close();
  }

  async getOne<P>(table: string, where: any) {
    try {
      const result = await this._connection
        .getRepository<P>(table)
        .findOne(where);
      return result;
    } catch {
      throw new DatabaseError();
    }
  }

  async getAll<P>(table: string) {
    try {
      const result = await this._connection.getRepository<P>(table).find();
      return result;
    } catch {
      console.log("error");
      throw new DatabaseError();
    }
  }

  async insert<P>(table: string, entry: P | P[]) {
    try {
      const repository = this._connection.getRepository(table);
      const result = Array.isArray(entry)
        ? await repository.save<P>(entry)
        : await repository.save<P>([entry]);
      return result;
    } catch (e) {
      if (e.code === "23505") {
        throw new DatabaseError(
          `Objeto com a mesma chave única já existe. ${e.detail}`,
          409
        );
      }
      throw new DatabaseError();
    }
  }

  async updateOne<P>(
    table: string,
    criterium: { [field: string]: string },
    entity: Partial<P>
  ) {
    try {
      const result = await this._connection
        .getRepository(table)
        .update(criterium, entity);
      return result;
    } catch {
      throw new DatabaseError();
    }
  }

  deleteAll() {
    try {
      const tables = this._connection.entityMetadatas;
      const promises = tables.map(async (t) => {
        await this._connection
          .getRepository(t.tableName)
          .query(`DELETE FROM ${t.tableName};`);
      });
      return Promise.all(promises);
    } catch {
      throw new DatabaseError();
    }
  }

  async delete<P>(table: string, criterium: any) {
    try {
      const result = await this._connection
        .getRepository<P>(table)
        .delete(criterium);
      return result.affected;
    } catch {
      throw new DatabaseError();
    }
  }
}
