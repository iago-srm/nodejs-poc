import { DependencyResolver } from "./dependency-resolver";
import { AwilixContainer } from "awilix";

export class RestControllerResolver extends DependencyResolver {
    httpMethods = ["post", "get", "put", "delete"];
    registeredControllerNames: string[] = [];
    getGlobPattern() {
      return `**/src/adapters/REST-controllers/**/@(${this.httpMethods.join(
        "|"
      )}).ts`;
    }
    resolveNames(fileName: string, filePath: string) {
      const dirs = this.getDirs(filePath); //test this on mac and linux
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