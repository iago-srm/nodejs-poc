import { Request, Response, NextFunction } from "express";
<<<<<<< HEAD
import { IController } from "../../../adapters/http-controllers/ports";
=======
import { IController } from "../../../adapters/REST-controllers/ports";
>>>>>>> c230531c3f75913c5321174d2e8515669f55c4b1

export class ExpressAdapter {
	static create (fn: IController) {
		return async function (req: Request, res: Response, next: NextFunction) {
			const {
                response,
                statusCode
            } = await fn(req.params, req.body, req.query);
			res.status(statusCode).json(response);
			next();
		}
	}
}