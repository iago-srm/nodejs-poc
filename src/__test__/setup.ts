import { testContainer } from "../containers";
import { testAppInstance, testDbInstance } from "./test.helpers";

jest.mock("../infrastructure/redis-client");

beforeAll(() => {
  return testAppInstance.start();
});

beforeEach(() => {
  return testDbInstance.deleteAll();
});

afterAll(() => {
  return testContainer.dispose();
});
