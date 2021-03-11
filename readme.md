# desenvolvimento

- 1º terminal: `npm run watch`
- 2º terminal: `npm run dev`
- A cada nova environment variable criada, rodar `npm run gen-env`, para atualizar o .env.d.ts

# docker

- rodar na raiz do projeto:
- `docker build -t iagosrm/<imageName>`
- `docker container run -p <someAvailablePort>:<portInEnv> --rm -d iagosrm/<imageName>`

# dockerized postgres

- baixar a imagem com `docker pull postgres`
- rodar o container com `docker run --name dev-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 -v ${HOME}/postgres-data/:/var/lib/postgresql/data postgres`.
- settar a senha passada acima em DATABASE_URL no .env, assim como a porta (-p <localPort>:<containerPort>).

## Accessing the db

### console

- Acess container console: `docker exec -it dev-postgres bash`.
- When inside, type in `psql -h localhost -U postgres` in order to connect to db.
- Once connceted, the following commands become available: https://www.postgresqltutorial.com/psql-commands/

### pgAdmin

- Download the docker image with `docker pull dpage/pgadmin4`
- Start the container with `docker run -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.local' -e 'PGADMIN_DEFAULT_PASSWORD=SuperSecret' --name dev-pgadmin -d dpage/pgadmin4`
- Run `docker inspect dev-postgres -f "{{json .NetworkSettings.Networks }}"` to print information about the db container. Copy the value of IPAddress field and go to localhost:80.
- In the browser, "Add New Server" and put the IPAddress under "Host name/address", as well as "postgres" and "mysecretpassword" as username and password (credentials used to set up db above). That should give you access to the db through the browser.
