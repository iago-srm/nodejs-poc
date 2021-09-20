import { createContainer, asClass, asValue, asFunction } from "awilix";
import { RedisProxy, logger, createRedisClient } from "@infrastructure";
import { UserUseCase } from "@application";
import { makeUserRouter } from "@presentation";
import { Application } from "./app";
import { dbConnectionNames } from "../ormconfig.enum";

export enum Dependencies {
  APP = "app",
  USERUSECASE = "userUseCase",
  DB = "db",
  MIDDLEWARE = "middleware",
  LOGGER = "logger",
  USERROUTER = "userRouter",
  DBCONNECTIONNAME = "dbConnectionName",
  REDISCLIENT = "redisClient",
}

const container = createContainer();

const _getDbConfig = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return {
        connectionName: dbConnectionNames.PRODUCTION,
        redisHost: process.env.REDIS_HOST,
        redisPort: process.env.REDIS_PORT,
      };
    case "development":
      return {
        connectionName: dbConnectionNames.DEVELOPMENT,
        redisHost: process.env.REDIS_HOST_DEVELOPMENT,
        redisPort: process.env.REDIS_PORT_DEVELOPMENT,
      };
    case "test":
      return {
        connectionName: dbConnectionNames.TEST,
        redisHost: process.env.REDIS_HOST_TEST,
        redisPort: process.env.REDIS_PORT_TEST,
      };
    default:
      return {
        connectionName: dbConnectionNames.DEVELOPMENT,
        redisHost: process.env.REDIS_HOST_DEVELOPMENT,
        redisPort: process.env.REDIS_PORT_DEVELOPMENT,
      };
  }
};

const config = _getDbConfig();

container.register({
  [Dependencies.DB]: asClass(RedisProxy)
    .singleton()
    .disposer(async (db) => await db.closeConnection()),
  [Dependencies.APP]: asClass(Application)
    .singleton()
    .disposer(async (app) => await app._server.close()),
  [Dependencies.LOGGER]: asValue(logger),
  [Dependencies.DBCONNECTIONNAME]: asValue(config.connectionName),
  [Dependencies.REDISCLIENT]: asFunction(createRedisClient).inject(() => {
    return {
      host: config.redisHost,
      port: config.redisPort,
    };
  }),

  // register use cases
  [Dependencies.USERUSECASE]: asFunction(UserUseCase).classic(),

  // register routers
  [Dependencies.USERROUTER]: asFunction(makeUserRouter).classic(),
});

export { container };
