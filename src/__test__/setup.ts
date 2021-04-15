import { dbWithCache, AsyncRedis } from '../infrastructure';

export const baseUrn = `/api/v1/users`;
export const testRedis = new AsyncRedis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT)
});

beforeAll(() => {
  const connection = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
  return dbWithCache.initWithCache(connection, testRedis);
});

beforeEach(() => {
  return dbWithCache.deleteAll();
});

afterAll(() => {
  return dbWithCache.closeConnection();
});