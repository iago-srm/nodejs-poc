import {
  IDatabase,
  IBaseCollection,
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
  constructor(private data) {}

  getOne(id: string) {
    return new Promise<P>((resolve) =>
      resolve(this.data.find((el) => el.id === id))
    );
  }

  getAll() {
    return new Promise<P[]>((resolve) => resolve(this.data));
  }

  insertOne(data) {
    this.data.push(data);
    return new Promise<P>((resolve) => resolve(data));
  }
}
