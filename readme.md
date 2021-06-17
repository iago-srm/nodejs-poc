# What this is

This is a NodeJS backend server _proof-of-concept_. I have implemented many of the most useful features you'd want in a backend server (see [this part](#why-it-is-cool)).  
In order to make this the code of a real project, all you have to do is add your own business entities (I have implemented a "user" entity) and choose the features you need, by removing features from the code and/or adding new ones (hopefully, as the project progresses, having to add new features to implement real projects will happen less often).

# Why it is cool

Here is a rundown of the concepts and technologies this project makes use of.

- Dependency Injection containerization with [awilix](https://github.com/jeffijoe/awilix).
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
- [Typescript](https://www.typescriptlang.org/) (along with [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) for development).
- Cache layer with [Redis](https://redis.io/).
- [Docker](https://www.docker.com/). App is dockerized, and uses a docker-compose.yaml to boot up the postgres and redis dbs as well as pgadmin in a custom local network.
- Internationalized validation messages.
- Validation of body and query parameters on all routes with [express-validator](https://express-validator.github.io/docs/).
- Integration tests of all routes with [Jest](https://jestjs.io/).
- [TypeORM](https://typeorm.io/#/).
- [Postgres](https://www.postgresql.org/) database.
- [Express](https://expressjs.com/).

# Run it locally

- It needs to run three containers simultaneously: redis, postgre and the app itself. Use the `docker-compose up` command to run all containers in the docker-compose.yaml file.
  When running it for the first time, you'll need to run the command twice, for the db server to persist its configuration in its volume first. The app will successfully connect the second time (see [DB connection resiliance](#todo)).
- In order to run the tests locally, you'll need NodeJS installed in your machine. Run the test suites with `npm run test`. It uses its own redis and postgres dbs, separated from the ones the app uses. See docker-compose.yaml.

# TODO

This is a work in progress. Here are my priorities moving forward

- Write test for redis after PUT calls.
- Figure out typeorm db migrations.
- Internationalize _Error()_ messages.
- CI/CD with Github Actions or Travis and run tests in a dedicated environment.
- Implement a branch with GraphQL.

My goal is to make this a proof-of-concept of a backend ready for a distributed systems environment. The following items are next in line in order to achieve that goal.

- Auth middleware (from @iago-srm/common).
- DB connection resiliance. There is no system in place to have the app retry the db connection in case it is severed, the app will just start to fail requests. Besides, if the db server is not ready to accept connections by the time the app tries to connect to it for the first time, there is no retry attempt.  
  For now, when the app starts with docker-compose, the [`wait-for-it.sh` script](https://github.com/vishnubob/wait-for-it) prevents a first connection error if the db volume has already been created. If it hasn't yet and the databases still have to be created (first time db boots in the current machine), the script doesn't cut it. In that case, it is necessary to stop docker-compose and rerun it.
- Obervability and health check. Probably with the [ELK stack](https://www.elastic.co/what-is/elk-stack).

# Development

- `npm run dev` to start app
- After each new environment variable created on '.env', run `npm run gen-env` to update .env.d.ts. That also updates .env.example (which is version-controlled).
- `docker build -t iagosrm/nodejs-poc .` to redo app image after a change.

## Accessing the databases

## postgres

### CLI

- Acess container console: `docker exec -it nodejs-poc_dev-postgres_1 bash`.
- When inside, type in `psql -h localhost -U postgres` in order to connect to db.
- Once connceted, [psql commands](https://www.postgresqltutorial.com/psql-commands/) become available.

### pgAdmin

In the browser, "Add New Server" and write "dev-postgres" in "Host name/address", as well as the credentials used on docker-compose. That should give you access to the db through the browser.

## redis

### CLI

In the container terminal, run `redis-cli` to input commands.

- `KEYS *` to get all keys.
- `FLUSHALL` to delete all keys.
- `exit` in order to exit both redis-cli and container's terminal.

### Redis-Commander

Uncomment this container in the `docker-compose.yaml` to use [redis commander](https://github.com/joeferner/redis-commander). Uncomment the appropriate "environment" lines based on what redis servers you have running.
