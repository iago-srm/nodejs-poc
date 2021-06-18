const commonConfig = {
  "type": "postgres",
  "logging": false,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  // synchronize makes the db reflect the model's code
  // "synchronize": process.env.NODE_ENV !== 'production',
  "synchronize": true,
  "entities": ["src/domain/entities/*.ts"],
  "migrations": ["src/migrations/*.ts"],
  "cli": {
    "migrationsDir": [
      "src/migrations"
    ],
    "entitiesDir": [
      "src/domain/entities"
    ]
  }
}

module.exports=[{
  ...commonConfig,
  "host": process.env.POSTGRES_HOST_DEVELOPMENT,
  "port": process.env.POSTGRES_PORT_DEVELOPMENT,
  "database": "postgres",
  "name": 'development'
  },{
    ...commonConfig,
  "host": process.env.POSTGRES_HOST,
  "port": process.env.POSTGRES_PORT,
  "database": "postgres",
  "name": 'production'
  },
  {
  ...commonConfig,
  "name": "test",
  "host": process.env.POSTGRES_HOST_TEST,
  "port": process.env.POSTGRES_PORT_TEST,
  "database": 'test'
  }
]