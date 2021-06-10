import request from "supertest";
import { getMockUsersArray } from "../mock-data";
import { getInvalidRandomEmail } from "@iagosrm/common";
import { normalizeJsonArray, normalizeJson } from "../test.helpers";
import { baseUrn } from "../setup";
import { testContainer, Dependencies } from "../../containers";
import { IUserUseCase } from "@application";
import { testAppInstance } from "../setup";

const app = testAppInstance._app;
const userUseCase: IUserUseCase = testContainer.resolve(
  Dependencies.USERUSECASE
);
const { insertUser } = userUseCase;

describe("GET users/ :: Route lists all users.", () => {
  it("Route returns 200 OK status code.", async () => {
    const response = await request(app).get(baseUrn);
    expect(response.status).toBe(200);
  });

  it("Returns empty array when there are no users in db.", async () => {
    const response = await request(app).get(baseUrn);
    expect(response.body).toEqual([]);
  });

  it("Returns array of correct size.", async () => {
    const arraySize = 3;
    await insertUser(getMockUsersArray(arraySize));
    const response = await request(app).get(baseUrn);
    expect(response.body.length).toEqual(arraySize);
  });

  it("Returns array of users.", async () => {
    const mockUsers = getMockUsersArray(3);
    await insertUser(mockUsers);
    const response = await request(app).get(baseUrn);
    expect(normalizeJsonArray(response.body)).toEqual(
      normalizeJsonArray(mockUsers)
    );
  });
});

describe("GET users/:email :: Route gets one user by email", () => {
  it("Route returns 200 OK status code.", async () => {
    const user = getMockUsersArray(1)[0];
    await insertUser(user);
    const response = await request(app).get(`${baseUrn}/${user.email}`);
    expect(response.status).toBe(200);
  });

  it("Route successfully returns user.", async () => {
    const user = getMockUsersArray(1)[0];
    await insertUser(user);
    const response = await request(app).get(`${baseUrn}/${user.email}`);
    expect({ ...response.body.user }).toMatchObject(normalizeJson(user));
  });

  it("Route returns 404 error when user is not found", async () => {
    const user = getMockUsersArray(1)[0];
    const response = await request(app).get(`${baseUrn}/${user.email}`);
    expect(response.status).toBe(404);
  });

  it("Route returns 400 error when e-mail is invalid", async () => {
    const response = await request(app).get(
      `${baseUrn}/${getInvalidRandomEmail()}`
    );
    expect(response.status).toBe(400);
  });
});
