import "reflect-metadata";
require('dotenv-safe').config({
  allowEmptyValues: true
});
import { container, Dependencies } from "./main/dependency-injection/containers";
import { Application } from "./main/http/express/app";

(async () => {
  const app: Application = container.resolve(Dependencies.APP);
  await app.start();
})();
