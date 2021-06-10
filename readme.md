# What this is

This is a NodeJS backend server _proof-of-concept_. I have implemented many of the most useful features you'd want in a backend server (see [this part](#why-it-is-cool)).  
To make this the code of a real project, all you have to do is add your own business entities (I have implemented a "user" entity) and choose the features you need, by removing features from the code and/or adding new ones (hopefully, as the project progresses, having to add new features to implement real projects will happen less often).

# Why it is cool

Here is a rundown of the concepts and technologies this project makes use of, by category.
### Javascript 
- [Typescript](https://www.typescriptlang.org/) (along with [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) for development)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/#/)
### Web 
- [Postgres](https://www.postgresql.org/) database
- Cache layer with [Redis](https://redis.io/)
- Internationalized validation messages
- Validation of body and query parameters on all routes with [express-validator](https://express-validator.github.io/docs/)
### Software Engineering
- Dependency Injection containerization with [awilix](https://github.com/jeffijoe/awilix)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- Integration tests of all routes with [Jest](https://jestjs.io/)
### other
- [Docker](https://www.docker.com/). App is dockerized and a bunch of other services it needs to run locally are as well. Its has a docker-compose.yaml file to help.

# Run it locally

# TODO
This is a work in progress. Here are my priorities moving forward
- Write test for redis after PUT calls.
- Internationalize _Error()_ messages.
- CI/CD with Github Actions and run tests there.
- Implement a branch with GraphQL instead of REST (Express).

# setup prévio

- `npm i -g typeorm`.
- Have a "test" db running locally for automated testing and a "staging" db (see ormconfig.js) running in the same pg app or in the cloud.

# desenvolvimento

- 1º terminal: `npm run watch`
- 2º terminal: `npm run dev`
- A cada nova environment variable criada em '.env', rodar `npm run gen-env`, para atualizar o .env.d.ts. Isso também atualiza .env.example (que vai para o git).
- A cada mudança ao db schema, fazer `typeorm migration:generate -n MigrationName`. One "Initial" migration after initial schema.

# docker

Run at the root of the project:

- `docker-compose pull` in order to pull all necessary images .
- `docker build -t iagosrm/nodejs-poc .`
- `docker container run -p 3000:3000 --rm -d iagosrm/nodejs-poc`

# dockerized postgres

- update DATABASE_URL on .env:
  - the port (-p `localPort` : `containerPort`),
  - o nome do service ao invés de localhost (`serviceName`-postgres-srv.yaml -> kind:Service -> metadata/name),
  - A senha passada para POSTGRES_PASSWORD acima.

## Accessing the db

### console

- Acess container console: `docker exec -it dev-postgres bash`.
- When inside, type in `psql -h localhost -U postgres` in order to connect to db.
- Once connceted, the following commands become available: https://www.postgresqltutorial.com/psql-commands/

### pgAdmin

- Run `docker inspect nodejs-poc_dev-postgres_1 -f "{{json .NetworkSettings.Networks }}"` to print information about the db container. Copy the value of IPAddress field and go to localhost:80.
- In the browser, "Add New Server" and put the IPAddress under "Host name/address", as well as "postgres" and "mysecretpassword" as username and password (credentials used on docker-compose).
  That should give you access to the db through the browser.

# dockerized redis

- In the container terminal, run `redis-cli` to input commands.
  - `KEYS *` to get all keys.
  - `FLUSHALL` to delete all keys.
  - `exit` in order to exit both redis-cli and container's terminal.
