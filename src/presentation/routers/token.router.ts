import { Request, Router } from "express";
import {
  DatabaseError,
  validateRequest,
  BadRequestError,
} from "@iagosrm/common";
import {
  userSerializer,
  getEmailValidator,
  getPasswordValidator,
  getUsernameValidator,
  getValidateRefreshToken,
} from "@presentation";
import { ITokenUseCase, IUserUseCase } from "@application";
import { User } from "@domain";
import { MessageNames } from "@locales";

const usernameRequired = false;

export const makeTokenRouter = (
  tokenUseCase: ITokenUseCase,
  userUseCase: IUserUseCase
) => {
  const { attachRefreshToken, getTokens } = tokenUseCase;
  const { getUserByEmailAndPassword, getUserById } = userUseCase;
  const tokenRouter = Router();

  tokenRouter.post(
    "/login",
    getEmailValidator(),
    getPasswordValidator(),
    getUsernameValidator(usernameRequired),
    validateRequest,
    async (req, res, _) => {
      const user = userSerializer(req.body);
      let validatedUser: User | undefined = undefined;
      try {
        validatedUser = await getUserByEmailAndPassword(user);
      } catch (e) {
        throw new DatabaseError(e.message);
      }
      if (!validatedUser)
        throw new BadRequestError(
          MessageNames.AUTHENTICATION.WRONG_CREDENTIALS
        );

      const { accessToken, refreshToken } = getTokens(validatedUser);

      attachRefreshToken(res, refreshToken);
      res.send(accessToken);
    }
  );

  tokenRouter.post(
    "/refresh",
    getValidateRefreshToken(getUserById),
    async (req: Request, res, _) => {
      const { accessToken, refreshToken } = getTokens(req.user!);
      attachRefreshToken(res, refreshToken);
      res.send(accessToken);
    }
  );

  tokenRouter.post("/log-out", validateRequest, async (_, res) => {
    attachRefreshToken(res, "");
    res.sendStatus(200);
  });

  return tokenRouter;
};
