import { IController } from "../../adapters/http-controllers/ports";
import { Request, ResponseToolkit } from 'hapi';

export class HapiAdapter {
	static create (fn: IController) {
		return async function (request: Request, h: ResponseToolkit) {
			const {
                response,
                statusCode
            } = await fn(request.params, request.payload);
			return h.response(response).code(statusCode);
		}
	}
}