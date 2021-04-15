import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';
import { errorHandler, startPolyglot, NotFoundError } from '@iagosrm/common';
import { userRouter } from './presentation/controllers';
import { __prod__ } from "./constants";
import { Messages } from './locales';

const baseUrn = process.env.BASE_URN;

const app = express();

app.use(json());
app.use(startPolyglot(Messages));

app.use(`${baseUrn}/users`, userRouter);

app.all('*', () => {throw new NotFoundError()});
app.use(errorHandler);

export { app };