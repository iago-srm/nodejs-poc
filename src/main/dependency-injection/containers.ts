import { createContainer, asClass, asValue } from 'awilix';
import { InMemoryDatabase, ExpressServer } from 'src/frameworks';
import { logger } from '@common';
import { dbConnectionNames } from '../../../ormconfig.enum';
import {
    RestControllerResolver,
    UseCaseResolver,
    DependencyResolver,
    RepositoryResolver,
} from './resolvers';
import {
    adaptControllerFunction as expressAdaptControllerFunction,
    adaptPath as expressAdaptPath,
} from 'src/frameworks/http/express';

export enum Dependencies {
    SERVER = 'server',
    DB = 'db',
    LOGGER = 'logger',
    DBCONNECTIONNAME = 'dbConnectionName',
}

const container = createContainer();

const _getDbConfig = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return {
                connectionName: dbConnectionNames.PRODUCTION,
                redisHost: process.env.REDIS_HOST,
                redisPort: process.env.REDIS_PORT,
            };
        case 'development':
            return {
                connectionName: dbConnectionNames.DEVELOPMENT,
                redisHost: process.env.REDIS_HOST_DEVELOPMENT,
                redisPort: process.env.REDIS_PORT_DEVELOPMENT,
            };
        case 'test':
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
    [Dependencies.DB]: asClass(InMemoryDatabase)
        .singleton()
        .disposer(async (db) => await db.closeConnection()),
    [Dependencies.SERVER]: asClass(ExpressServer)
        .singleton()
        .disposer(async (app) => app._server.close()),
    [Dependencies.LOGGER]: asValue(logger),
    [Dependencies.DBCONNECTIONNAME]: asValue(config.connectionName),
});
const restControllersResolver = new RestControllerResolver();
const resolvers = [
    restControllersResolver,
    new UseCaseResolver(),
    new RepositoryResolver(),
];

const loadModulesWithResolver = (resolver: DependencyResolver) => {
    container.loadModules([resolver.getGlobPattern()], {
        formatName: (name, descriptor) => {
            return resolver.resolveNames(name, descriptor.path);
        },
    });
};

resolvers.forEach((resolver) => loadModulesWithResolver(resolver));

const expressServer: ExpressServer = container.resolve(Dependencies.SERVER);
restControllersResolver
    .getControllers(container)
    .forEach((controllerDescriptor) => {
        expressServer.registerRoute({
            method: controllerDescriptor.method,
            path: expressAdaptPath(controllerDescriptor.path),
            controller: expressAdaptControllerFunction(
                controllerDescriptor.controller
            ),
        });
    });

export { container };
