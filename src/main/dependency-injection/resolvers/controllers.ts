import { DependencyResolver } from "./dependency-resolver";
import { AwilixContainer } from "awilix";
import { Routes } from '@adapters';

export class RestControllerResolver extends DependencyResolver {
    // httpMethods = ["post", "get", "put", "delete"];
    registeredControllerNames: string[] = [];
    getGlobPattern() {
      return `**/src/adapters/REST-controllers/**/*.ts`;
    }
    resolveNames(fileName: string) {
      const name = `${fileName}-RESTcontroller`;
      this.registeredControllerNames.push(name);
      return name;
    }
    _getControllers(container: AwilixContainer) {
      return this.registeredControllerNames.map((name) => ({
        path: Routes[name].path,
        method: Routes[name].method,
        controller: container.resolve(name),
      }));
    }
  }