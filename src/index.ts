import "reflect-metadata";
import "dotenv-safe/config";
import { container, Dependencies } from "./containers";
import { Application } from "./app";

(async () => {
  const app: Application = container.resolve(Dependencies.APP);
  await app.start();
})();
