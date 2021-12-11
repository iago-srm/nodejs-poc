import { Request, Response, NextFunction } from 'express';
import {
    IHTTPController,
    IHTTPControllerPathDescriptor,
} from '@adapters/REST-controllers';
import { IHTTPFrameworkAdapter } from '../server';

export class ExpressControllerAdapter implements IHTTPFrameworkAdapter {
    adaptControllerFunction(fn: IHTTPController) {
        return async function (
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            const { response, statusCode } = await fn(
                req.params,
                req.body,
                req.query
            );
            res.status(statusCode).json(response);
            next();
        };
    }

    adaptPath(pathDescriptor: IHTTPControllerPathDescriptor) {
        return (
            '/' +
            pathDescriptor
                .map(
                    (descriptor) =>
                        `${descriptor.isParams ? ':' : ''}${
                            descriptor.resource
                        }${descriptor.isOptional ? '?' : ''}`
                )
                .join('/')
        );
    }
}
