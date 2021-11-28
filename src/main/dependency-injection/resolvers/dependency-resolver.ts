import path from "path";

export abstract class DependencyResolver {
    getDirs(filePath: string) {
        return filePath.split(path.sep);
    }
    abstract getGlobPattern(): string;
    abstract resolveNames(fileName: string, filePath: string): string;
}