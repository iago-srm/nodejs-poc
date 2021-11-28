import {
  IDatabase,
  IBaseCollection
} from "@/src/adapters/repositories/base-repository";

export class InMemoryDatabase implements IDatabase {
  db: {
    [key: string]: InMemoryCollection<any>;
  };

  connect() {
    this.db = {
      products: new InMemoryCollection([]),
      cart: new InMemoryCollection([]),
    };
    return new Promise<boolean>((resolve) => resolve(true));
  }

  close() {
    this.db = {};
    return new Promise<boolean>((resolve) => resolve(true));
  }

  getCollection(collectionName: string) {
    return this.db[collectionName];
  }
}

class InMemoryCollection<P> implements IBaseCollection<P> {
  constructor(private repository: P[]) {}

  // TODO: test if this promise throws when rejected (search object with non-existing id)
  getOneById(id: string) {
    return new Promise<P>((resolve, reject) => {
        const entity = this.repository.find((el) => {
          return (el as {[k: string]: any}).id === id
        });
        if(!entity) {
          reject(`Object with id ${id} not found`);
          return;
        }
        resolve(entity);
      }
    );
  }

  getAll() {
    return new Promise<P[]>((resolve) => resolve(this.repository));
  }

  insertOne(data: P) {
    this.repository.push(data);
    return new Promise<P>((resolve) => resolve(data));
  }
}
