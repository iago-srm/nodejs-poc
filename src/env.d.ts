declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    REDIS_PORT: string;
    REDIS_HOST: string;
  }
}
