import { start, deleteAll } from "./test.helpers";

beforeAll(() => {
  return start();
});

beforeEach(() => {
  return deleteAll();
});
