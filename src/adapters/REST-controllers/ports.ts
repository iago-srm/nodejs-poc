export type IHTTPController = (
    params: any,
    body: any,
    query: any
) => Promise<{ response: any; statusCode: number }>;

export type IHTTPControllerPathDescriptor = {
    resource: string;
    isParams: boolean;
    isOptional?: boolean;
}[];

export type IHTTPMethod = 'post' | 'get' | 'put' | 'delete';
export interface IHTTPControllerDescriptor<Controller> {
    method: IHTTPMethod;
    path: IHTTPControllerPathDescriptor;
    controller: Controller;
}
