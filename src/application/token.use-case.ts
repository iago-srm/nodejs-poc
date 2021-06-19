import { User } from "@domain";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { Response } from "express";

export const TokenUseCase = () => {
  const getTokens = (user: User) => {
    const { password, ...u } = user;
    const refreshToken = sign(
      {
        data: u,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn:
          process.env.NODE_ENV !== "test"
            ? process.env.REFRESH_TOKEN_EXPIRE_TIME
            : 3,
      } // in seconds
    );
    const accessToken = sign(
      {
        data: u,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn:
          process.env.NODE_ENV !== "test"
            ? process.env.ACCESS_TOKEN_EXPIRE_TIME
            : 3,
      } // 30s
    );

    return {
      refreshToken,
      accessToken,
    };
  };
  const attachRefreshToken = (res: Response, token: string) => {
    res.cookie("isid", token, {
      httpOnly: true,
      // path: "/api/v1/tokens/refresh",
    });
  };
  const openRefreshToken = (token: string) =>
    verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
  const openAccessToken = (token: string) =>
    verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

  return {
    getTokens,
    attachRefreshToken,
    openRefreshToken,
    openAccessToken,
  };
};

export type ITokenUseCase = ReturnType<typeof TokenUseCase>;
