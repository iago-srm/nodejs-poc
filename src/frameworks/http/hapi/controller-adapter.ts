import { IHTTPController } from '../../../adapters/REST-controllers/ports'
import { Request, ResponseToolkit } from 'hapi'

export class HapiAdapter {
    static create(fn: IHTTPController) {
        return async function (request: Request, h: ResponseToolkit) {
            const { response, statusCode } = await fn(
                request.params,
                request.payload,
                request.query
            )
            return h.response(response).code(statusCode)
        }
    }
}
