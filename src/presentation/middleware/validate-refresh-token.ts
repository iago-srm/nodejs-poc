import { Request, Response } from "express";
import { DatabaseError, BadRequestError } from "@iagosrm/common";
import { verify } from "jsonwebtoken";
import { userSerializer } from "@presentation";
import { User } from "@domain";

export const getValidateRefreshToken =
  (getUserById: any) => async (req: Request, _: Response, next: any) => {
    const token = req.cookies.isid;
    if (!token) {
      throw new BadRequestError("No refresh token was supplied", 403);
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
      payload = userSerializer(payload.data);
    } catch (err) {
      throw new BadRequestError(err, 403);
    }

    let user: User | undefined = undefined;
    try {
      // token is valid and we can send back an access token
      user = await getUserById(payload);
    } catch (e) {
      throw new DatabaseError(e.message);
    }

    if (!user) {
      throw new BadRequestError(
        "User in refresh token payload does not exist",
        403
      );
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      throw new DatabaseError("This refresh token is no longer valid", 403);
    }

    // current version of user from database gets sent back, in case it has changed since last refresh
    req.user = userSerializer(user);
    return next();
  };
