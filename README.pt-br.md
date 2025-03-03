# NLW Connect - Trilha Node.js

[EN](README.md)

## Descrição

Este projeto foi desenvolvido durante a trilha de Node.js no NLW Connect 2025. O projeto consiste no backend de um site de inscrição para um evento fictício, com um sistema de ranking baseado em convites. O backend está atualmente sendo hospedado no [Render](https://render.com).

- [Site publicado](https://nlw-connect-react-three.vercel.app)
- [Repositório do frontend](https://github.com/susankizawa/nlw-connect-react)
- [Docs da API do backend](https://nlw-connect-node-js.onrender.com/docs)

## Funcionalidades

O backend gerencia as inscrições para o evento e o sistema de indicação, utilizando **PostgreSQL** como banco de dados principal e **Redis** para armazenamento rápido e recuperação dos dados de acessos aos links de convite e do ranking.

### PostgreSQL + Drizzle
- O PostgreSQL é usado para armazenar os dados dos inscritos, incluindo:
  - `id` (UUID): identificador único do inscrito gerado aleatoriamente
  - `name` (STRING): nome do inscrito
  - `email` (STRING): e-mail único do inscrito
  - `created_at` (TIMESTAMP): data e hora da inscrição
- O gerenciamento do esquema do banco de dados e a comunicação são feitos com Drizzle

### Sistema de Indicação e Ranking com Redis

- Contagem de cliques no link de convite
  - Armazenado em um **hash** (`referral:access-count`), onde a chave é o `id` do inscrito e o valor é o número de cliques no seu link de convite
  - Formato: `{id: num_cliques}`
- Ranking de indicações bem-sucedidas
  - Utiliza um **sorted set** (`referral:ranking`), onde o membro é o `id` do inscrito e o score representa o número de indicações bem-sucedidas
  - O **sorted set** permite uma recuperação eficiente dos rankings em ordem decrescente e a seleção de um intervalo específico, como os **top 3 inscritos**

### Link de Convite e Rastreamento de Referrers

- O link de convite redireciona os usuários para a página de inscrição no evento, passando o **ID do referrer** através dos parâmetros de busca na URL
- Isso possibilita duas operações principais:
  - Incrementar o número de **indicações bem-sucedidas** no sorted set:
    ```bash
    ZINCRBY referral:ranking 1 <referrerId>
    ```
  - Incrementar a **contagem de cliques** no link de convite do referrer no hash:
    ```bash
    HINCRBY referral:access-count <referrerId> 1
    ```

### Docker para Desenvolvimento e Testes

- O Docker foi usado para iniciar rapidamente os containers do PostgreSQL e Redis em ambientes locais de desenvolvimento e testes

## Setup

- [Instruções de instalação do Docker para Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- `docker-compose pull`: baixa a imagem mais recente para cada serviço definido no `docker-compose.yml`
- `docker-compose up -d`: inicia todos os containers dos serviços definidos no `docker-compose.yml` em modo detached (executa em segundo plano)
- `npx drizzle-kit generate`: comando para criar os arquivos de migração com base no esquema definido no `drizzle.config.ts`
- `npx drizzle-kit migrate`: comando para aplicar as migrações geradas e criar as tabelas no banco de dados com base no esquema
- `npm install`: comando para instalar as dependências do projeto
- `npm run dev`: comando para iniciar o projeto em modo de desenvolvimento
- `npm run start`: comando para iniciar o projeto em modo de produção

## Comandos Adicionais

- `docker ps`: lista todos os containers em execução, você pode usar isso para obter os nomes dos serviços dos containers
- `docker exec -it <service_name> psql -h localhost -p 5432 -U docker connect`: conecta ao container do PostgreSQL como o usuário `docker` no banco de dados `connect` em modo interativo, será solicitado a senha após executar esse comando
- `docker exec -it <service_name> redis-cli`: conecta ao container do Redis em modo interativo, permitindo que você interaja com a instância do Redis

### Observações
- `<service_name>`: Substitua isso pelo nome ou ID real do serviço/container em execução (você pode obter isso com o comando `docker ps`)
- A flag `-it` significa interativo e terminal, permitindo que você interaja com o shell do container

## Tecnologias usadas

- [Fastify](https://fastify.dev)
- [Cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
- [Drizzle](https://orm.drizzle.team)
- [Ioredis](https://github.com/redis/ioredis)
- [PostgreSQL](https://www.postgresql.org)
- [Zod](https://zod.dev)
- [Typescript](https://www.typescriptlang.org)
- [Docker](https://www.docker.com)
- [Swagger](https://swagger.io)
- [Render](https://render.com)

## Variáveis de ambiente

- `PORT`: a porta em que o servidor irá escutar por requisições
- `FRONTEND_URL`: URL do frontend para comunicação com o frontend
- `POSTGRES_URL`: URL de conexão com o banco de dados PostgreSQL
- `REDIS_URL`: URL de conexão com o banco de dados Redis

## Melhorias futuras




