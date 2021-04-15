const commonConfig = {
  "type": "postgres",
  "logging": false,
  "username": "postgres",
  "password": "mysecretpassword",
  // synchronize makes the db reflect the model's code
  "synchronize": process.env.NODE_ENV !== 'production',
  "entities": ["dist/domain/entities/*.js"],
  "migrations": ["dist/migrations/*.js"],
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
  "host": "localhost",
  "port": 5432,
  "database": "staging",
  "name": 'development'
  },
  {
  ...commonConfig,
  "name": "test",
  "host": "localhost",
  "port": 5432,
  "database": "test",
  }
]