export interface IDatabase {
  init: () => Promise<void>;
  getOne: <P>(table: string, where: any) => Promise<P>;
  getAll: <P>(table: string) => Promise<P[]>;
  insert: (table: string, entry: any) => Promise<void>;
  update: (table: string, entry: any) => Promise<void>;
}