import "reflect-metadata";
import "dotenv-safe/config";
import { devContainer, Dependencies } from "./containers";
import { Application } from "./app";

(async () => {
  const app: Application = devContainer.resolve(Dependencies.APP);
  await app.start();
})();
