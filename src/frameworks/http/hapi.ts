<<<<<<< HEAD
import { IController } from "../../adapters/http-controllers/ports";
=======
import { IController } from "../../adapters/REST-controllers/ports";
>>>>>>> c230531c3f75913c5321174d2e8515669f55c4b1
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