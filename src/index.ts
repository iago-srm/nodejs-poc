import "reflect-metadata";
import express from 'express';
import { json } from 'body-parser';
import "dotenv-safe/config";
import { Database } from './frameworks';
import { getUserRouter } from './presentation/controllers';
import { __prod__ } from "./constants";
import { notFoundHandler, generalErrorHandler } from './presentation/middleware/error-handling';

const main = async () => {

  // necessary initializations
  const app = express();
  app.use(json());
  const db = new Database();
  await db.init();

  // route bindings
  app.use('/users', getUserRouter(db));
  app.get('*', notFoundHandler);
  
  app.use(generalErrorHandler);

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

main();