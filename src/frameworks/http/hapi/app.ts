import {
    Server as AbstractServer,
    IHTTPServerConstructorParams,
} from '../server';
import Hapi, { Server } from 'hapi';
import { Request } from 'hapi';
import { IHTTPControllerDescriptor } from '@adapters/REST-controllers';

interface IHapiConstructorParams extends IHTTPServerConstructorParams {
    hapiControllers: IHTTPControllerDescriptor<Request, string>[];
}

export class HapiServer extends AbstractServer {
    _app: Server;

    constructor({ db, logger, hapiControllers }: IHapiConstructorParams) {
        super({ db, logger });

        this._app = new Hapi.Server({
            routes: {
                cors: {
                    origin: process.env.CORS_ALLOW?.split(' '),
                    headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
                    exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
                    additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
                    maxAge: 60,
                    credentials: true, // boolean - 'Access-Control-Allow-Credentials'
                },
            },
        });

        hapiControllers.forEach((descriptor) => {
            this._app.route({
                method: descriptor.method.toUpperCase(),
                path: descriptor.path,
                handler: descriptor.controller,
            });
        });
    }
}
