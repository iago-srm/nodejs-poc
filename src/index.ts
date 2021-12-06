import "reflect-metadata";
require("dotenv-safe").config({
  allowEmptyValues: true,
});
import {
  container,
  Dependencies,
} from "./main/dependency-injection/containers";
import { ExpressServer } from "./frameworks/http/express/app";

(async () => {
  const server: ExpressServer = container.resolve(Dependencies.SERVER);
  await server.start();
})();
