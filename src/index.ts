import "reflect-metadata";
import "dotenv-safe/config";
import { dbWithCache, AsyncRedis } from './infrastructure';
import { app } from './app';

const main = async () => {

  const connection = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
  const redis = new AsyncRedis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT)
  });
  await dbWithCache.initWithCache(connection, redis);
  
  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

try {
  main();
} catch(e) {
  console.error(e);
}