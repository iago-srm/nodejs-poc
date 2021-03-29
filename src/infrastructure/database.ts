import { DatabaseError } from "../presentation/errors";
import { createConnection, Connection } from "typeorm";

export class Database {
  
  connection: Connection;

  async init () {
    this.connection = await createConnection();
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

  async updateOne<P>(table: string, criterium: {[field: string]: string}, entity: Partial<P>) {
    return this.connection.getRepository(table).update(criterium, entity);
  }
}
