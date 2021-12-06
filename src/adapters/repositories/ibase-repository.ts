export interface IBaseCollection<P> {
  getOneById: (id: string) => Promise<P>;
  getAll: () => Promise<P[]>;
  insertOne: (entity: P) => Promise<P>;
  editOne: (id: string, entity: P) => Promise<P>;
}

export interface IDatabase {
  connect: () => Promise<boolean>;
  closeConnection: () => Promise<boolean>;
  getCollection: <P>(collectionName: string) => IBaseCollection<P>;
}
