import express, { Express, RequestHandler, Router } from "express";
import "express-async-errors";
import { NotFoundError } from "@iagosrm/common";
import { __prod__ } from "./constants";
import { RedisProxy } from "@infrastructure";
import { Server } from "http";

const baseUrn = process.env.BASE_URN;

interface ApplicationParams {
  middleware: { [key: string]: RequestHandler };
  userRouter: Router;
  db: RedisProxy;
}

export class Application {
  _app: Express;
  _db: RedisProxy;
  _server: Server;

  constructor({ middleware, userRouter, db }: ApplicationParams) {
    this._app = express();
    this._db = db;
    this._app.use(middleware.json);
    this._app.use(middleware.polyglot);

    this._app.use(`${baseUrn}/users`, userRouter);

    this._app.all("*", () => {
      throw new NotFoundError();
    });

    this._app.use(middleware.errorHandler);
  }

  async start() {
    await this._db.init();
    if (process.env.NODE_ENV !== "test") {
      this._server = this._app.listen(
        parseInt(process.env.APP_PORT || "3000"),
        () => {
          console.log(`Listening on port ${process.env.APP_PORT}`);
        }
      );
    }
  }

  async stop() {
    this._server.close();
  }
}
