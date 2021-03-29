# setup prévio

- `npm i -g typeorm`.
- Have a "test" db running locally for automated testing and a "staging" db (see ormconfig.js) running in the same pg app or in the cloud.

# desenvolvimento

- 1º terminal: `npm run watch`
- 2º terminal: `npm run dev`
- A cada nova environment variable criada, rodar `npm run gen-env`, para atualizar o .env.d.ts.
Criar a variável com valor em .env e a key em .env.example (que vai para o git).
- A cada mudança ao db schema, fazer `typeorm migration:generate -n MigrationName`. One "Initial" migration after initial schema.

# docker

Rodar na raiz do projeto:

- `docker build -t iagosrm/<imageName> .`
- `docker container run -p <someAvailablePort>:<portInEnv> --rm -d iagosrm/<imageName>`

# dockerized postgres

- baixar a imagem com `docker pull postgres`
- rodar o container com `docker run --name dev-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 -v ${HOME}/postgres-data/:/var/lib/postgresql/data postgres`.
- alterar DATABASE_URL no .env:
  - a porta (-p `localPort` : `containerPort`),
  - o nome do service ao invés de localhost (`serviceName`-postgres-srv.yaml -> kind:Service -> metadata/name),
  - A senha passada para POSTGRES_PASSWORD acima.

## Accessing the db

### console

- Acess container console: `docker exec -it dev-postgres bash`.
- When inside, type in `psql -h localhost -U postgres` in order to connect to db.
- Once connceted, the following commands become available: https://www.postgresqltutorial.com/psql-commands/

### pgAdmin

- Download the docker image with `docker pull dpage/pgadmin4`
- Start the container with `docker run -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.local' -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret' --name dev-pgadmin -d dpage/pgadmin4`. Credenciais passadas como env serão para login no pgAdmin4.
- Run `docker inspect dev-postgres -f "{{json .NetworkSettings.Networks }}"` to print information about the db container. Copy the value of IPAddress field and go to localhost:80.
- In the browser, "Add New Server" and put the IPAddress under "Host name/address", as well as "postgres" and "mysecretpassword" as username and password (credentials used to set up db above). That should give you access to the db through the browser.

# dockerized redis
- Download the docker image with `docker pull redis`
- Access the container doing `docker exec -it dev-redis /bin/bash`
- In the container terminal, run `redis-cli` to input commands. 
  - `KEYS *` to get all keys.
  - `FLUSHALL` to delete all keys.
- In order to get all values stored in redis, do `docker exec -i dev-redis bash < get-redis-entries.sh`. 

