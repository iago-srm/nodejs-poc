import "reflect-metadata";
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import "dotenv-safe/config";
import { 
  Database, 
  emailValidator, 
  emailParamsValidator,
  passwordValidator, 
  usernameValidator,
  getErrors 
} from './frameworks';
import { getUserRouter } from './presentation/controllers';
import { __prod__ } from "./constants";
import { errorHandler } from './presentation/middleware';
import { NotFoundError } from "./presentation/errors";

const main = async () => {

  // necessary initializations
  const app = express();
  app.use(json());

  const db = new Database();
  await db.init();

    // route bindings
  app.use('/users', 
    getUserRouter(
      db, 
      { emailValidator, emailParamsValidator, passwordValidator, usernameValidator },
      getErrors
    ));
  app.all('*', () => {throw new NotFoundError()});
  
  app.use(errorHandler);

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

main();