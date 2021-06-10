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
