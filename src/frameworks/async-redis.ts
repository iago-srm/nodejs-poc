import { RedisClient } from 'redis';
import { promisify } from 'util';

export class AsyncRedis extends RedisClient {
  asyncGet = promisify(this.get).bind(this);
  asyncSet = promisify(this.set).bind(this);
  asyncDel = promisify(this.del).bind(this);
}
