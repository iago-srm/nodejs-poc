export interface IBaseCollection<P> {
  getOne: (id: string) => Promise<P>;
  getAll: () => Promise<P[]>;
  insertOne: (args: P) => Promise<P>;
}

export interface IDatabase {
  connect: (connectionInfo: any) => Promise<boolean>;
  close: () => Promise<boolean>;
  getCollection: <P>(collectionName: string) => IBaseCollection<P>;
}
