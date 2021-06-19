import { testAppInstance, testDbInstance } from "./helpers/instances";

beforeAll(() => {
  return testAppInstance.start();
});

beforeEach(() => {
  return testDbInstance.deleteAll();
});
