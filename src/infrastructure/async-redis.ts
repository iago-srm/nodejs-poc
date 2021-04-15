import { RedisClient } from 'redis';
import { promisify } from 'util';

export interface IRedisClient extends RedisClient {
  asyncGet: (args: any) => Promise<any>;
  asyncSet: (args: any) => Promise<any>;
  asyncDel: (args: any) => Promise<any>;
  asyncFlushDb: (args: any) => Promise<any>;
  asyncQuit: (args: any) => Promise<any>;
}

export class AsyncRedis extends RedisClient implements IRedisClient{
  asyncGet = promisify(this.get).bind(this);
  asyncSet = promisify(this.set).bind(this);
  asyncDel = promisify(this.del).bind(this);
  asyncFlushDb = promisify(this.flushdb).bind(this);
  asyncQuit = promisify(this.quit).bind(this);

  static _getEntryName(table: string, where: any) {
    return `${table}_${JSON.stringify(where)}`;
  }
}