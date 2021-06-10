// import { asClass, asValue } from "awilix";
// import { rootContainer } from "./containers";
// import { AsyncRedis } from "./infrastructure";

// const testContainer = rootContainer.createScope();

// testContainer.register({
//   dbConnectionName: asValue("test"),
//   redisClient: asClass(AsyncRedis)
//     .singleton()
//     .inject(() => ({
//       host: process.env.REDIS_HOST_TEST,
//       port: process.env.REDIS_PORT_TEST,
//     })),
// });

// export { testContainer };
