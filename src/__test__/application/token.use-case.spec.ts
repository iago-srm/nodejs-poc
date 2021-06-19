import { getMockUser, tokenUseCase } from "../helpers";
import jwt, { JwtPayload, JsonWebTokenError } from "jsonwebtoken";

describe("TokenUseCase.getTokens", () => {
  const { getTokens } = tokenUseCase;
  const user = getMockUser();
  const { password, ...u } = user;

  it("Should return access token with user information signed with env.ACCESS_TOKEN_SECRET", () => {
    const { accessToken } = getTokens(user);
    const payload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;
    expect(payload.data).toStrictEqual(u);
  });

  it("Should return refresh token with user information signed with env.REFRESH_TOKEN_SECRET", () => {
    const { refreshToken } = getTokens(user);
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload;
    expect(payload.data).toStrictEqual(u);
  });

  it("Refresh token cannot be opened with an invalid signature", () => {
    const { refreshToken } = getTokens(user);
    expect(() =>
      jwt.verify(refreshToken, "not the refresh token secret")
    ).toThrow(JsonWebTokenError);
  });

  it("Access token cannot be opened with an invalid signature", () => {
    const { accessToken } = getTokens(user);
    expect(() =>
      jwt.verify(accessToken, "not the access token secret")
    ).toThrow(JsonWebTokenError);
  });

  it("Should return valid access token if expire time has not passed.", () => {
    const { accessToken } = getTokens(user);
    expect(() =>
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
    ).not.toThrow();
  });

  it("Should return invalid access token if expire time has passed.", () => {
    const { accessToken } = getTokens(user);
    setTimeout(() => {
      expect(() =>
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
      ).toThrow(JsonWebTokenError);
    }, 5000);
  });

  it("Should return valid refresh token if expire time has not passed.", () => {
    const { refreshToken } = getTokens(user);
    expect(() =>
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
    ).not.toThrow();
  });

  it("Should return invalid refresh token if expire time has passed.", () => {
    const { refreshToken } = getTokens(user);
    setTimeout(() => {
      expect(() =>
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
      ).toThrow(JsonWebTokenError);
    }, 5000);
  });
});

// describe("TokenUseCase.attachRefreshToken", () => {
//   it("Should attach a cookie named isid to the express request object", () => {
//     const request = {};
//     const user = getMockUser();
//     const { password, ...u } = user;
//     const { getTokens, attachRefreshToken } = tokenUseCase;
//     const { accessToken } = getTokens(user);
//     attachRefreshToken(request as Request, accessToken);
//   });
// })
