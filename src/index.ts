import "reflect-metadata";
import "dotenv-safe/config";
import { devContainer, Dependencies } from "./containers";
import { Application } from "./app";

const main = async () => {
  const app: Application = devContainer.resolve(Dependencies.APP);
  await app.start();
};

try {
  main();
} catch (e) {
  console.error(e);
}
