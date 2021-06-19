import { BadRequestError } from "@iagosrm/common";
import { verify } from "jsonwebtoken";

export const authenticateMiddleware =
  () => async (req: Request, _: Response, next: any) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      throw new BadRequestError("Not authenticated", 403);
    }

    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      req.user = payload;
    } catch (err) {
      throw new BadRequestError("Not authenticated", 401);
    }

    return next();
  };
