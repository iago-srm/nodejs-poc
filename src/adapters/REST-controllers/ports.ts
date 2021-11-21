export type IController = 
    (params: any, body: any, query: any) => 
        Promise<{ response: any, statusCode: number }>;