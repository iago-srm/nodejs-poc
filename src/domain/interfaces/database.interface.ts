import { UpdateResult } from "typeorm";

export interface IDatabase {
  init: () => Promise<void>;
  getOne: <P>(table: string, where: any) => Promise<P | undefined>;
  getAll: <P>(table: string) => Promise<P[]>;
  insertOne: <P>(table: string, entry: P) => Promise<P[]>;
  updateOne: <P>(table: string, criterium: {[field: string]: string}, entity: Partial<P>) => 
    Promise<UpdateResult>;
}