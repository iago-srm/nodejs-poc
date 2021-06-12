declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    REDIS_PORT_DEVELOPMENT: string;
    REDIS_HOST_DEVELOPMENT: string;
    REDIS_PORT_TEST: string;
    REDIS_HOST_TEST: string;
    BASE_URN: string;
    POSTGRES_HOST_DEVELOPMENT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
  }
}
