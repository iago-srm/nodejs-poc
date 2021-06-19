import { createContainer, asClass, asValue, asFunction } from "awilix";
import { logger, Database } from "@infrastructure";
import { UserUseCase } from "@application";
import { makeUserRouter } from "@presentation";
import { Application } from "./app";
import { Messages } from "@locales";
import { dbConnectionNames } from "../ormconfig.enum";

export enum Dependencies {
  APP = "app",
  USERUSECASE = "userUseCase",
  DB = "db",
  MIDDLEWARE = "middleware",
  LOGGER = "logger",
  USERROUTER = "userRouter",
  DBCONNECTIONNAME = "dbConnectionName",
}

const container = createContainer();

const _getDbConnectionName = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return dbConnectionNames.PRODUCTION;
    case "development":
      return dbConnectionNames.DEVELOPMENT;
    case "test":
      return dbConnectionNames.TEST;
    default:
      return dbConnectionNames.DEVELOPMENT;
  }
};

container.register({
  [Dependencies.DB]: asClass(Database)
    .singleton()
    .disposer(async (db) => await db.closeConnection()),
  [Dependencies.APP]: asClass(Application)
    .singleton()
    .disposer(async (app) => await app._server.close()),
  [Dependencies.LOGGER]: asValue(logger),
  [Dependencies.DBCONNECTIONNAME]: asValue(_getDbConnectionName()),

  // register use cases
  [Dependencies.USERUSECASE]: asFunction(UserUseCase).classic(),

  // register routers
  [Dependencies.USERROUTER]: asFunction(makeUserRouter).classic(),
});

export { container };
