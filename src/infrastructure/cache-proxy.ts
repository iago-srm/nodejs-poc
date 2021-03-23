import { DatabaseError } from '../presentation/errors';
import { AsyncRedis } from './async-redis';
import { Database } from './database';

// with this implementation, it is necessary that the object literal used to retrieve the
// entity be identical to the one used as criterium to find an entity for update.
export class RedisProxy extends Database {

  private _redisClient: AsyncRedis;
  // in seconds
  constructor(private _cacheDuration = 100){
    super();
  }

  private _getEntryName(table: string, where: any) {
    return `${table}_${JSON.stringify(where)}`;
  }

  init() {
    // this._redisClient = new AsyncRedis({ path: process.env.REDIS_URL});
    this._redisClient = new AsyncRedis({ 
      host: process.env.REDIS_HOST, 
      port: parseInt(process.env.REDIS_PORT)
    });

    return super.init();
  };

  async getOne<P>(table: string, where: any) {
    let cacheResult: string | null = 
      await this._redisClient.asyncGet(this._getEntryName(table, where));
    if(cacheResult) return JSON.parse(cacheResult);
    let dbResult = undefined;
    try {
      dbResult = await super.getOne<P>(table, where);
      if (dbResult) await this._redisClient.asyncSet(
        this._getEntryName(table,where), 
        JSON.stringify(dbResult), 
        "EX", this._cacheDuration
      );
    } catch {
      throw new DatabaseError('Erro de cache.');
    }
    return dbResult;
  }

  async updateOne<P>(table: string, criterium: { [field: string]: string}, entity: Partial<P>) {
    const result = await super.updateOne<P>(table, criterium, entity);
    await this._redisClient.asyncDel(this._getEntryName(table, criterium));
    return result;
  }
}