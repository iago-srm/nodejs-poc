import * as awilix from 'awilix';
import { TypeORMDatabase } from '@frameworks/databases';
import { logger } from '@common/logger';
import { dbConnectionNames } from '../../../ormconfig.enum';
import {
    RestControllerResolver,
    UseCaseResolver,
    DependencyResolver,
    RepositoryResolver,
} from './resolvers';
import {
    ExpressServer as FrameworkServer,
    ExpressControllerAdapter as FrameworkControllerAdapter,
} from '@frameworks/http';

export enum Dependencies {
    SERVER = 'server',
    DB = 'db',
    LOGGER = 'logger',
    DBCONNECTIONNAME = 'dbConnectionName',
}

const container = awilix.createContainer();

// const _getDbConfig = () => {
//     switch (process.env.NODE_ENV) {
//         case 'production':
//             return {
//                 connectionName: dbConnectionNames.PRODUCTION,
//                 redisHost: process.env.REDIS_HOST,
//                 redisPort: process.env.REDIS_PORT,
//             };
//         case 'development':
//             return {
//                 connectionName: dbConnectionNames.DEVELOPMENT,
//                 redisHost: process.env.REDIS_HOST_DEVELOPMENT,
//                 redisPort: process.env.REDIS_PORT_DEVELOPMENT,
//             };
//         case 'test':
//             return {
//                 connectionName: dbConnectionNames.TEST,
//                 redisHost: process.env.REDIS_HOST_TEST,
//                 redisPort: process.env.REDIS_PORT_TEST,
//             };
//         default:
//             return {
//                 connectionName: dbConnectionNames.DEVELOPMENT,
//                 redisHost: process.env.REDIS_HOST_DEVELOPMENT,
//                 redisPort: process.env.REDIS_PORT_DEVELOPMENT,
//             };
//     }
// };

// const dbConfig = _getDbConfig();
container.register({
    [Dependencies.DB]: awilix
        .asClass(TypeORMDatabase)
        .singleton()
        .disposer(async (db) => await db.closeConnection()),
    [Dependencies.LOGGER]: awilix.asValue(logger),
    [Dependencies.DBCONNECTIONNAME]: awilix.asValue(process.env.NODE_ENV === 'production' ? dbConnectionNames.PRODUCTION : dbConnectionNames.DEVELOPMENT),
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
const httpFrameworkadapter = new FrameworkControllerAdapter();

container.register({
    [Dependencies.SERVER]: awilix
        .asClass(FrameworkServer)
        .singleton()
        .inject((c) => {
            return {
                expressControllers: restControllersResolver
                    .getControllers(c)
                    .map((controllerDescriptor) => {
                        return {
                            method: controllerDescriptor.method,
                            path: httpFrameworkadapter.adaptPath(
                                controllerDescriptor.path
                            ),
                            controller:
                                httpFrameworkadapter.adaptControllerFunction(
                                    controllerDescriptor.controller
                                ),
                        };
                    }),
            };
        }),
});

export { container };
