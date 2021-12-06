import express, { Express, RequestHandler, Router } from 'express';
import 'express-async-errors';
import { NotFoundError } from '@iagosrm/common';
// import { logger, RedisProxy } from "src/frameworks";
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import { Server as WSServer } from 'socket.io';
import { errorHandler, startPolyglot } from '@iagosrm/common';
import { Messages } from '@locales';
import { Server as AbstractServer } from '../server';
import { IDatabase, IHTTPMethod } from '@adapters';

export class ExpressServer extends AbstractServer {
    _app: Express;
    baseUrn = 'api/v1';
    _logger: any;
    _io: WSServer;

    constructor({ db, logger }) {
        super({ db, logger });
        this._app = express();

        this.setupServer(this._app);

        // CORS
        const allowlist = process.env.CORS_ALLOW?.split(' ');
        const corsOptionsDelegate = function (req, callback) {
            let corsOptions;
            if (allowlist?.indexOf(req.header('Origin')) !== -1) {
                corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
            } else {
                corsOptions = { origin: false }; // disable CORS for this request
            }
            callback(null, corsOptions); // callback expects two parameters: error and options
        };
        this._app.use(cors(corsOptionsDelegate));

        //Middleware
        this._app.use(json());
        this._app.use(startPolyglot(Messages));

        // Security
        this._app.use(helmet());
        this._app.disable('x-powered-by');

        // Routers
        // this._app.use(`/${this.baseUrn}/users`, userRouter);

        // this._app.all('*', () => {
        //     throw new NotFoundError();
        // });

        this._app.use(errorHandler);
    }

    registerRoute(descriptor: {
        method: IHTTPMethod;
        path: string;
        controller: RequestHandler;
    }) {
        console.log(descriptor);
        this._app[descriptor.method](descriptor.path, descriptor.controller);
    }

    // _setIOServer = (server) => {
    //   this._io = new WSServer(server);
    // };
    // secureStart() {
    //   const localHostSSL = {
    //     key: fs.readFileSync("./certificates/key.pem"),
    //     cert: fs.readFileSync("./certificates/cert.pem"),
    //   };
    //   // this._server = https.createServer(localHostSSL, this._app);
    //   this._server = https.createServer(localHostSSL, this._hapiApp.op);

    //   this._setIOServer(this._server);
    //   const start = () => {
    //     const { address, port } = this._server.address() as AddressInfo;
    //     this._logger.info(`Secure app running at ${address}:${port}`);
    //   };
    //   this._server.listen(parseInt(process.env.APP_PORT || "443"), start);
    // }

    // async nonSecureStart() {
    //   // this._server = http.createServer(this._app);
    //   this._server = http.createServer(this._hapiApp.app);
    //   this._setIOServer(this._server);
    //   this._server.listen(parseInt(process.env.APP_PORT || "3000"), () => {
    //     const { address, port } = this._server.address() as AddressInfo;
    //     this._logger.info(`App running at ${address}:${port}`);
    //   });
    // }

    // async start() {
    //   // try {
    //   //   await this._db.init();
    //   // } catch (e) {
    //   //   logger.error(
    //   //     `There was an error connecting to the database: ${e.message}`
    //   //   );
    //   // }
    //   if (process.env.NODE_ENV !== "test") {
    //     try {
    //       await this.secureStart();
    //     } catch (e) {
    //       logger.error(`Secure start failed due to error: ${e.message}`);
    //       await this._nonSecureStart();
    //     }
    //   }
    // }

    // async stop() {
    //   this._server.close();
    // }
}
