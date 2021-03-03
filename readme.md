# desenvolvimento

- 1º terminal: npm run watch
- 2º terminal: npm run dev
- A cada nova environment variable criada, rodar npm run gen-env, para atualizar o .env.d.ts

# # docker

- rodar na raiz do projeto:
docker build -t iagosrm/<imageName>
docker container run -p <someAvailablePort>:<portInEnv> --rm -d iagosrm/<imageName>
