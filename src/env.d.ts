declare namespace NodeJS {
  export interface ProcessEnv {
    APP_PORT: string;
    POSTGRES_HOST_DEVELOPMENT: string;
    POSTGRES_PORT_DEVELOPMENT: string;
    POSTGRES_HOST_TEST: string;
    POSTGRES_PORT_TEST: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    HOME: string;
    CORS_ALLOW: string;
  }
}

import { User } from "@domain";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
