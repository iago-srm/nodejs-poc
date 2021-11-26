import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  listModules,
  AwilixContainer,
} from "awilix";
import { RedisProxy, logger, createRedisClient } from "src/frameworks";
// import { AddToCartUseCaseFactory } from "@application";
// import { CartPostFactory } from "@adapters";
import path from "path";
// import { makeUserRouter } from "src/adapters";
import { Application } from "./http/express/app";
import { dbConnectionNames } from "../../ormconfig.enum";
import fg from "fast-glob";

export enum Dependencies {
  APP = "app",
  USECASES = "userUseCase",
  DB = "db",
  MIDDLEWARE = "middleware",
  LOGGER = "logger",
  USERROUTER = "userRouter",
  DBCONNECTIONNAME = "dbConnectionName",
  REDISCLIENT = "redisClient",
}
const UseCases = {
  ADDTOCART: "AddToCartUseCase",
};

// const Controllers = {
//   CARTPOST: "CartPost",
// };

// const Routers = {
//   CART: "cart",
// };

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

// const _getUseCases = () => {
//   const paths = fg.sync('**/src/application/use-cases/*/index.ts');
//   // console.log('paths:',paths);
//   console.log(require(paths[0]));
// };
// _getUseCases();

const _getControllers = () => {
  // const paths = fg.sync('**/src/adapters/http-controllers/**/(post|get|put|delete).ts');
  // console.log(paths);
  // paths.forEach(path => {
  //   const dirs = path.split('/');
  //   console.log('route:',dirs[dirs.length-2]);
  //   console.log('method:',dirs[dirs.length-1].split('.')[0]);
  // });
  // console.log(process.cwd())
  const results = listModules(["**/src/**/http-controllers/**/post.ts"]);
  console.log("results:", results);
};
// _getControllers();
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
  // [UseCases.ADDTOCART]: asFunction(AddToCartUseCaseFactory).classic(),

  // register controllers
  // [Controllers.CARTPOST]: asFunction(CartPostFactory),
  // register routers
  // [Routers.CART]:
  // [Dependencies.USERROUTER]: asFunction(makeUserRouter).classic(),
});

class RestControllerNameResolver {
  httpMethods = ["post", "get", "put", "delete"];
  registeredControllerNames: string[] = [];
  _getGlobPattern() {
    return `**/src/adapters/REST-controllers/**/@(${this.httpMethods.join(
      "|"
    )}).ts`;
  }
  _resolveControllerName(fileName: string, filePath: string) {
    const dirs = filePath.split(path.sep); //test this on mac and linux
    // console.log(dirs);
    const entity = dirs[dirs.length - 2];
    const method = fileName.split(".")[0];
    const name = `${entity}-${method}-RESTcontroller`;
    this.registeredControllerNames.push(name);
    return name;
  }
  _getControllers(container: AwilixContainer) {
    return this.registeredControllerNames.map((name) => ({
      entity: name.split("-")[0],
      method: name.split("-")[1],
      controller: container.resolve(name),
    }));
  }
}

const controllerResolver = new RestControllerNameResolver();

container.loadModules([controllerResolver._getGlobPattern()], {
  formatName: (name, descriptor) =>
    controllerResolver._resolveControllerName(name, descriptor.path),
});

// console.log(controllerResolver._getControllers(container));
export { container };
