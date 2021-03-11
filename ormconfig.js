
module.exports={
  "type": "postgres",
  "logging": true,
  "host": "localhost",
  "port": 5432,
  "synchronize": process.env.NODE_ENV !== 'production',
  "username": "postgres",
  "password": "mysecretpassword",
  "database": "postgres",
  "entities": ["dist/entities/*.js"],
  "migrations": ["dist/migrations/*.js"]
}