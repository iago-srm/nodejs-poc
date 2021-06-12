# What this is

This is a NodeJS backend server _proof-of-concept_. I have implemented many of the most useful features you'd want in a backend server (see [this part](#why-it-is-cool)).  
To make this the code of a real project, all you have to do is add your own business entities (I have implemented a "user" entity) and choose the features you need, by removing features from the code and/or adding new ones (hopefully, as the project progresses, having to add new features to implement real projects will happen less often).

# Why it is cool

Here is a rundown of the concepts and technologies this project makes use of.

- Dependency Injection containerization with [awilix](https://github.com/jeffijoe/awilix)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Typescript](https://www.typescriptlang.org/) (along with [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) for development)
- Cache layer with [Redis](https://redis.io/)
- [Docker](https://www.docker.com/). App is dockerized, and uses a docker-compose.yaml to boot up the postgres and redis dbs as well as pgadmin in a custom local network.
- [TypeORM](https://typeorm.io/#/)
- [Postgres](https://www.postgresql.org/) database.
- Internationalized validation messages
- Validation of body and query parameters on all routes with [express-validator](https://express-validator.github.io/docs/)
- Integration tests of all routes with [Jest](https://jestjs.io/)
- [Express](https://expressjs.com/)

# Run it locally

- It needs to run three containers simultaneously: redis, postgre and the app itself. Use the `docker-compose up` command to run all containers in the docker-compose.yaml file.

# TODO

This is a work in progress. Here are my priorities moving forward

- Write test for redis after PUT calls.
- Internationalize _Error()_ messages.
- CI/CD with Github Actions and run tests there.
- Implement a branch with GraphQL.

# development

- `npm run dev` to start app
- A cada nova environment variable criada em '.env', rodar `npm run gen-env`, para atualizar o .env.d.ts. Isso também atualiza .env.example (que vai para o git).
- (Migrations)
- `docker build -t iagosrm/nodejs-poc .` to redo app image after a change.

## Accessing the db

### console

- Acess container console: `docker exec -it nodejs-poc_dev-postgres_1 bash`.
- When inside, type in `psql -h localhost -U postgres` in order to connect to db.
- Once connceted, the following commands become available: https://www.postgresqltutorial.com/psql-commands/

### pgAdmin

- In the browser, "Add New Server" and write "" in "Host name/address", as well as the credentials used on docker-compose. That should give you access to the db through the browser.

## redis

- In the container terminal, run `redis-cli` to input commands.
  - `KEYS *` to get all keys.
  - `FLUSHALL` to delete all keys.
  - `exit` in order to exit both redis-cli and container's terminal.
- Alternatively, you can uncomment the redis-commander container on docker-compose and get a gui to see what's going on in the redis container.
