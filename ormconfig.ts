const commonConfig = {
  type: "postgres",
  database: "postgres",
  logging: false,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  // synchronize makes the db reflect the model's code
  // "synchronize": process.env.NODE_ENV !== 'production',
  synchronize: true,
  entities: ["src/domain/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  cli: {
    migrationsDir: ["src/migrations"],
    entitiesDir: ["src/domain/entities"],
  },
};

module.exports = [
  {
    ...commonConfig,
    host: process.env.POSTGRES_HOST_DEVELOPMENT,
    port: process.env.POSTGRES_PORT_DEVELOPMENT,
    name: "development",
  },
  {
    ...commonConfig,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: "production",
  },
  {
    ...commonConfig,
    host: process.env.POSTGRES_HOST_TEST,
    port: process.env.POSTGRES_PORT_TEST,
    name: "test",
  },
];
