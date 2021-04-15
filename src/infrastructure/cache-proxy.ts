import { DatabaseError } from '@iagosrm/common';
import { AsyncRedis, IRedisClient } from './async-redis';
import { Database } from './database';

// with this implementation, it is necessary that the object literal used to retrieve the
// entity be identical to the one used as criterium to find an entity for update.
class RedisProxy extends Database {

  private _cacheDuration = 100
  _redisClient: AsyncRedis;

  constructor() {
    super();
  }

  initWithCache(connection: string, redis: IRedisClient) {
    this._redisClient = redis;
    return super.init(connection);
  };

  async closeConnection() {
    await this._redisClient.asyncQuit();
    return super.closeConnection();
  }

  async getOne<P>(table: string, where: any): Promise<P | undefined> {
    let cacheResult: string | null = 
      await this._redisClient.asyncGet(AsyncRedis._getEntryName(table, where));
    if(cacheResult) return JSON.parse(cacheResult);
    let dbResult = undefined;
    try {
      dbResult = await super.getOne<P>(table, where);
      if (dbResult) await this._redisClient.asyncSet(
        AsyncRedis._getEntryName(table,where), 
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
    await this._redisClient.asyncDel(AsyncRedis._getEntryName(table, criterium));
    return result;
  }

  async deleteAll() {
    try {
      await this._redisClient.asyncFlushDb();
      return super.deleteAll();
    } catch {
      throw new DatabaseError();
    }
  }
}

const dbWithCache = new RedisProxy();
export { dbWithCache }