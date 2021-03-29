import "reflect-metadata";
import "dotenv-safe/config";
import { setDb, db } from './infrastructure/get-db';
import { app } from './app';

const main = async () => {

  setDb();
  db.init();
  
  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

try {
  main();
} catch(e) {
  console.error(e);
}