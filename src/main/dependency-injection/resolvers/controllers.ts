import { DependencyResolver } from './dependency-resolver';
import { AwilixContainer } from 'awilix';
import { Routes, IHTTPControllerDescriptor, IHTTPController } from '@adapters/REST-controllers';

export class RestControllerResolver extends DependencyResolver {
    getGlobPattern() {
        return `**/src/adapters/REST-controllers/**/*.ts`;
    }
    resolveNames(fileName: string) {
        const name = `${fileName}-RESTcontroller`;
        return name;
    }
    getControllers(container: AwilixContainer) {
        // const _interpretControllerPath = (path) => {
        //     const pathParts = path.split('/');
        //     for (let i = 0; i < pathParts.length; i++) {
        //         const pathDescriptor = {
        //             isOptional: false,
        //             resource: '',
        //             isParams: false,
        //         };
        //         const param = pathParts[i];
        //         let resource = param;
        //         if (param[0] === '[' && param[param.length - 1] === ']') {
        //             pathDescriptor.isParams = true;
        //             resource = param.substring(1, param.length);
        //         }
        //     }
        // };

        const controllers: IHTTPControllerDescriptor<IHTTPController>[] = [];
        for (let registrationName in container.registrations) {
            if (registrationName.includes('RESTcontroller')) {
                controllers.push(container.resolve(registrationName));
            }
        }
        return controllers;
    }
}
