import { Request, Response, NextFunction } from "express";
import { IController } from "../../../adapters/REST-controllers/ports";

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