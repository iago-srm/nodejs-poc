import request from "supertest";
import { getMockUsersArray } from "../mock-data";
import { baseUrn, testDbInstance } from "../setup";
import { testAppInstance } from "../setup";
import { IUserUseCase } from "@application";
import { testContainer, Dependencies } from "../../containers";
import { normalizeJson } from "../test.helpers";

const app = testAppInstance._app;
const userUseCase: IUserUseCase = testContainer.resolve(
  Dependencies.USERUSECASE
);
const { insertUser } = userUseCase;

describe("Redis cache.", () => {
  it("user is saved after get/:email route is called.", async () => {
    const user = getMockUsersArray(1)[0];
    await insertUser(user);
    await request(app).get(`${baseUrn}/${user.email}`);
    const cachedUser = await testDbInstance._redisClient.asyncGet(
      testDbInstance._redisClient._getEntryName("users", {
        email: user.email,
      })
    );
    expect(JSON.parse(cachedUser)).toStrictEqual(normalizeJson(user));
  });

  it("user is deleted from cache after it is updated with put/:email.", async () => {
    const user = getMockUsersArray(1)[0];
    await insertUser(user);
    await request(app).put(`${baseUrn}/${user.email}`);
    const cachedUser = await testDbInstance._redisClient.asyncGet(
      testDbInstance._redisClient._getEntryName("users", {
        email: user.email,
      })
    );
    expect(JSON.parse(cachedUser)).toStrictEqual(null);
  });
});
