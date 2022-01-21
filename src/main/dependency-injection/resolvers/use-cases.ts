import { DependencyResolver } from "./dependency-resolver";

export class UseCaseResolver extends DependencyResolver {
    getGlobPattern() {
        return `**/src/application/use-cases/**/index.ts`;
    }
    resolveNames(_: string, filePath: string) {
        const dirs = this.getDirs(filePath); //test this on mac and linux
        const useCaseNamePascalCase = dirs[dirs.length - 2];
        const camelCase = useCaseNamePascalCase.toLowerCase().replace(/([-][a-z])/g, group =>
            group
            .toUpperCase()
            .replace('-', '')
        );
        return `${camelCase}UseCase`;
    }
}