const commonConfig = {
  "type": "postgres",
  "logging": false,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  // synchronize makes the db reflect the model's code
  "synchronize": process.env.NODE_ENV !== 'production',
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
  "port": 5432,
  "database": "development",
  "name": 'development'
  },
  {
  ...commonConfig,
  "name": "test",
  "host": "localhost",
  "port": 5432,
  "database": 'test'
  }
]