import { setDb, db } from '../infrastructure/get-db';

setDb('test');

beforeAll(async () => {
  await db.init();
});

beforeEach(async () => {

});

afterAll(async () => {
  // (db instanceof TestDatabase) ? await db.killTestDb() : null;
});