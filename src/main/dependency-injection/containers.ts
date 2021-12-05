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
import { Server } from "../../frameworks/http/express/app";
import { dbConnectionNames } from "../../../ormconfig.enum";
import fg from "fast-glob";
import { 
  RestControllerResolver, 
  UseCaseResolver, 
  DependencyResolver, 
  RepositoryResolver 
} from './resolvers';
import { registerExpressRoutes } from '../http/express/register-routes';

export enum Dependencies {
  SERVER = "server",
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

const config = _getDbConfig();

container.register({
  [Dependencies.DB]: asClass(RedisProxy)
    .singleton()
    .disposer(async (db) => await db.closeConnection()),
  [Dependencies.SERVER]: asClass(Server)
    .singleton()
    .disposer(async (app) => app._server.close()),
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


const restControllersResolver = new RestControllerResolver();
const resolvers = [
  restControllersResolver,
  new UseCaseResolver(),
  new RepositoryResolver()
];

const loadModulesWithResolver = (resolver: DependencyResolver) => {
  container.loadModules([resolver.getGlobPattern()], {
    formatName: (name, descriptor) => {
      return resolver.resolveNames(name, descriptor.path);
    }
  })
}

resolvers.forEach(resolver => loadModulesWithResolver(resolver));

const server: Server = container.resolve("server");
restControllersResolver._getControllers(container).forEach(controller => {
  registerExpressRoutes(server._app, controller);
})
// console.log(controllerResolver._getControllers(container));
export { container };
