import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';
import { 
  emailValidator, 
  emailParamsValidator,
  newPasswordValidator, 
  existingPasswordValidator,
  usernameValidator
} from './infrastructure';
import { getUserRouter } from './presentation/controllers';
import { __prod__ } from "./constants";
import { errorHandler } from './presentation/middleware';
import { NotFoundError } from "./presentation/errors";

 // necessary initializations
const app = express();
app.use(json());

// route bindings
app.use('/api/v1/users', 
  getUserRouter(
    { emailValidator, emailParamsValidator, newPasswordValidator, existingPasswordValidator, usernameValidator },
  ));

app.all('*', () => {throw new NotFoundError()});

app.use(errorHandler);

export { app };