import "express-async-errors";
import { logger, Database } from "@infrastructure";

import express, { Express, Router } from "express";
import { AddressInfo } from "net";
import fs from "fs";
import http, { Server as HttpServer } from "http";
import https, { Server as HttpsServer } from "https";
import { Server } from "http";
import helmet from "helmet";
import { NotFoundError, startPolyglot, errorHandler } from "@iagosrm/common";
import cookieParser from "cookie-parser";
import cors from "cors";
import { json } from "body-parser";

import { Messages } from "@locales";

interface ApplicationParams {
  userRouter: Router;
  tokenRouter: Router;
  db: Database;
  logger: any;
}

export class Application {
  _app: Express;
  _server: HttpServer | HttpsServer;
  _db: Database;
  baseUrn = "/api/v1";
  _logger: any;

  constructor({ userRouter, tokenRouter, db, logger }: ApplicationParams) {
    this._app = express();
    this._db = db;
    this._logger = logger;

    // CORS
    const allowlist = process.env.CORS_ALLOW!.split(" ");
    const corsOptionsDelegate = function (req, callback) {
      let corsOptions;
      if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false }; // disable CORS for this request
      }
      callback(null, { ...corsOptions, credentials: true }); // callback expects two parameters: error and options
    };
    this._app.use(cors(corsOptionsDelegate));

    //Middleware
    this._app.use(json());
    this._app.use(startPolyglot(Messages));
    this._app.use(cookieParser());

    // Security
    this._app.use(helmet());
    this._app.disable("x-powered-by");

    this._app.use(`${this.baseUrn}/users`, userRouter);
    this._app.use(`${this.baseUrn}/tokens`, tokenRouter);

    this._app.all("*", () => {
      throw new NotFoundError();
    });

    this._app.use(errorHandler);
  }

  async _secureStart() {
    const localHostSSL = {
      key: fs.readFileSync("./certificates/key.pem"),
      cert: fs.readFileSync("./certificates/cert.pem"),
    };
    this._server = https.createServer(localHostSSL, this._app);
    const start = () => {
      const { address, port } = this._server.address() as AddressInfo;
      this._logger.info(`Secure app running at ${address}:${port}`);
    };
    this._server.listen(parseInt(process.env.APP_PORT || "43"), start);
  }

  async _nonSecureStart() {
    this._server = http.createServer(this._app);
    this._server.listen(parseInt(process.env.APP_PORT || "3000"), () => {
      const { address, port } = this._server.address() as AddressInfo;
      this._logger.info(`App running at ${address}:${port}`);
    });
  }

  async start() {
    try {
      await this._db.init();
    } catch (e) {
      this._logger.error(
        `There was an error connecting to the database: ${e.message}. Attempted to connect to ${this._db._connection?.name}`
      );
    }
    if (process.env.NODE_ENV !== "test") {
      try {
        await this._secureStart();
      } catch (e) {
        this._logger.error(`Secure start failed due to error: ${e.message}`);
        await this._nonSecureStart();
      }
    }
  }

  async stop() {
    this._server.close();
  }
}
