import { Server as AbstractServer } from "../server";
import Hapi, { Server } from "hapi";

export class HapiServer extends AbstractServer {
  _app: Server;

  constructor() {
    super();
    this._app = new Hapi.Server({
      routes: {
        cors: {
          origin: process.env.CORS_ALLOW?.split(" "),
          headers: ["Authorization"], // an array of strings - 'Access-Control-Allow-Headers'
          exposedHeaders: ["Accept"], // an array of exposed headers - 'Access-Control-Expose-Headers',
          additionalExposedHeaders: ["Accept"], // an array of additional exposed headers
          maxAge: 60,
          credentials: true, // boolean - 'Access-Control-Allow-Credentials'
        },
      },
    });
  }
}
