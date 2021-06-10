declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    REDIS_PORT_DEVELOPMENT: string;
    REDIS_HOST_DEVELOPMENT: string;
    REDIS_PORT_TEST: string;
    REDIS_HOST_TEST: string;
    BASE_URN: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
  }
}
