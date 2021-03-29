import { Database } from './database';
import { createConnection, Connection } from "typeorm";

export class TestDatabase extends Database {

  connection: Connection;
  killTestDb: any;

  async init () {
    this.connection = await createConnection("test");
  }
}

const tdb = new TestDatabase();
export { tdb }