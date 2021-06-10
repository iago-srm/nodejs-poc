import { RedisClient } from "redis";
import { promisify } from "util";

// export interface IRedisClient extends RedisClient {
//   asyncGet: (args: any) => Promise<any>;
//   asyncSet: (args: any) => Promise<any>;
//   asyncDel: (args: any) => Promise<any>;
//   asyncFlushDb: (args: any) => Promise<any>;
//   asyncQuit: (args: any) => Promise<any>;
// }

export class AsyncRedis extends RedisClient {
  asyncGet = promisify(this.get).bind(this);
  asyncSet = promisify(this.set).bind(this);
  asyncDel = promisify(this.del).bind(this);
  asyncFlushDb = promisify(this.flushdb).bind(this);
  asyncQuit = promisify(this.quit).bind(this);

  _getEntryName(table: string, where: any) {
    return `${table}_${JSON.stringify(where)}`;
  }
}

export const createRedisClient = (args: { host: string; port: number }) => {
  const { host, port } = args;
  return new AsyncRedis({ host, port });
};
