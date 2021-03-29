import { redis, RedisProxy } from './cache-proxy';
import { tdb, TestDatabase } from './test-db';

let db: TestDatabase | RedisProxy = redis;

export const setDb = (type = 'staging') => {
  if(type === 'test') db = tdb;
  else db = redis;
}

export { db }