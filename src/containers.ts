import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer,
} from "awilix";
import { errorHandler, startPolyglot } from "@iagosrm/common";

import { RedisProxy, logger, createRedisClient } from "@infrastructure";
import { UserUseCase } from "@application";
import { makeUserRouter } from "@presentation";
import { Application } from "./app";
// import { SecureApplication } from "./secure-app";
import { Messages } from "@locales";
import { dbConnectionNames } from "../ormconfig.enum";

export enum MiddlewareNames {
  polyglot = "polyglot",
  errorHandler = "errorHandler",
}

export enum Dependencies {
  APP = "app",
  USERUSECASE = "userUseCase",
  DB = "db",
  MIDDLEWARE = "middleware",
  SECURE_APP = "secureApp",
}

const rootContainer = createContainer();

rootContainer.register({
  [Dependencies.DB]: asClass(RedisProxy)
    .singleton()
    .disposer(async (db) => await db.closeConnection()),
  [Dependencies.APP]: asClass(Application)
    .singleton()
    .disposer(async (app) => await app._server.close()),
  [Dependencies.MIDDLEWARE]: asValue({
    [MiddlewareNames.errorHandler]: errorHandler,
    [MiddlewareNames.polyglot]: startPolyglot(Messages),
  }),
  logger: asValue(logger),
  // [Dependencies.SECURE_APP]: asClass(SecureApplication)
  //   .singleton()
  //   .disposer(async (app) => await app._server.close()),
  // register use cases
  [Dependencies.USERUSECASE]: asFunction(UserUseCase).classic(),

  // register routers
  userRouter: asFunction(makeUserRouter).classic(),
});

const container = rootContainer.createScope();
const testContainer = rootContainer.createScope();

const devContainerConfig = {
  dbConnectionName: dbConnectionNames.DEVELOPMENT,
  redisHost: process.env.REDIS_HOST_DEVELOPMENT,
  redisPort: process.env.REDIS_PORT_DEVELOPMENT,
};

const prodContainerConfig = {
  dbConnectionName: dbConnectionNames.PRODUCTION,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};

const testContainerConfig = {
  dbConnectionName: dbConnectionNames.TEST,
  redisHost: process.env.REDIS_HOST_TEST,
  redisPort: process.env.REDIS_PORT_TEST,
};

const registerScopeDependencies = (
  scopeContainer: AwilixContainer,
  config: any
) => {
  scopeContainer.register({
    dbConnectionName: asValue(config.dbConnectionName),
    redisClient: asFunction(createRedisClient).inject(() => {
      return {
        host: config.redisHost,
        port: config.redisPort,
      };
    }),
  });
};

registerScopeDependencies(
  container,
  process.env.NODE_ENV === "production"
    ? prodContainerConfig
    : devContainerConfig
);

registerScopeDependencies(testContainer, testContainerConfig);

export { container as devContainer, testContainer };
