import { DatabaseError } from "@iagosrm/common";
import { AsyncRedis } from "./redis-client";
import { Database, DatabaseParams, IDatabase } from "./database";

// with this implementation, it is necessary that the object literal used to retrieve the
// entity be identical to the one used as criterium to find an entity for update.

interface RedisDatabaseParams extends DatabaseParams {
  redisClient: AsyncRedis;
}

export class RedisProxy extends Database implements IDatabase {
  private _cacheDuration = 100;
  _redisClient: AsyncRedis;

  constructor({ dbConnectionName, redisClient }: RedisDatabaseParams) {
    super({ dbConnectionName });
    this._redisClient = redisClient;
  }

  init() {
    return super.init();
  }

  async closeConnection() {
    await this._redisClient.asyncQuit();
    return super.closeConnection();
  }

  async getOne<P>(table: string, where: any): Promise<P | undefined> {
    let cacheResult: string | null = await this._redisClient.asyncGet(
      this._redisClient._getEntryName(table, where)
    );
    if (cacheResult) return JSON.parse(cacheResult);
    let dbResult = undefined;
    try {
      dbResult = await super.getOne<P>(table, where);
      if (dbResult)
        await this._redisClient.asyncSet(
          this._redisClient._getEntryName(table, where),
          JSON.stringify(dbResult),
          "EX",
          this._cacheDuration
        );
    } catch {
      throw new DatabaseError("Erro de cache.");
    }
    return dbResult;
  }

  async updateOne<P>(
    table: string,
    criterium: { [field: string]: string },
    entity: Partial<P>
  ) {
    const result = await super.updateOne<P>(table, criterium, entity);
    try {
      await this._redisClient.asyncDel(
        this._redisClient._getEntryName(table, criterium)
      );
    } catch {
      throw new DatabaseError();
    }

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

  async delete<P>(table: string, criterium: any) {
    await this._redisClient.asyncDel(
      this._redisClient._getEntryName(table, criterium)
    );
    return super.delete<P>(table, criterium);
  }
}
