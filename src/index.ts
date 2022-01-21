import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true,
});
import {
  container,
  Dependencies,
} from "./main/dependency-injection/containers";
import { ExpressServer } from "./frameworks/http/express/app";
import {
  IDatabase,
  IBaseCollection
} from "@adapters/repositories";

(async () => {
  let server: ExpressServer;
  try {
    const db:IDatabase = await container.resolve(Dependencies.DB);
    await db.connect();
    server = container.resolve(Dependencies.SERVER);
    await server.start();
  } catch(e) {
    console.error("Server instanciating failed",e);
  }
})();
