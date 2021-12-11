import {
    IHTTPController,
    IHTTPControllerPathDescriptor,
} from '@adapters/REST-controllers';
import { Request, ResponseToolkit } from 'hapi';
import { IHTTPFrameworkAdapter } from '../server';

export class ExpressControllerAdapter implements IHTTPFrameworkAdapter {
    adaptControllerFunction(fn: IHTTPController) {
        return async function (request: Request, h: ResponseToolkit) {
            const { response, statusCode } = await fn(
                request.params,
                request.payload,
                request.query
            );
            return h.response(response).code(statusCode);
        };
    }
    adaptPath(pathDescriptor: IHTTPControllerPathDescriptor) {
        return (
            '/' +
            pathDescriptor
                .map(
                    (descriptor) =>
                        `${descriptor.isParams ? '{' : ''}${
                            descriptor.resource
                        }${descriptor.isOptional ? '?' : ''}${
                            descriptor.isParams ? '}' : ''
                        }`
                )
                .join('/')
        );
    }
}
