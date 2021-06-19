import { logger, Database } from "@infrastructure";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer,
} from "awilix";
import { UserUseCase, TokenUseCase } from "@application";
import { makeUserRouter, makeTokenRouter } from "@presentation";
import { Application } from "./app";
import { Messages } from "@locales";
import { dbConnectionNames } from "../ormconfig.enum";

export enum Dependencies {
  APP = "app",
  TOKENUSECASE = "tokenUseCase",
  USERUSECASE = "userUseCase",
  DB = "db",
  LOGGER = "logger",
  USERROUTER = "userRouter",
  TOKENROUTER = "tokenRouter",
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
  [Dependencies.TOKENUSECASE]: asFunction(TokenUseCase).classic(),

  // register routers
  [Dependencies.USERROUTER]: asFunction(makeUserRouter).classic(),
  [Dependencies.TOKENROUTER]: asFunction(makeTokenRouter).classic(),
});

export { container };
