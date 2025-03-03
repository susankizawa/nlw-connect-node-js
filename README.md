# NLW Connect - Node.js Course

[PT-BR](README.pt-br.md)

## Description

This project was developed during the React Course for NLW Connect 2025. The project consists of the backend of a subscription site for a fictitious event, including a ranking system based on invites. The backend is currently being hosted on [Render](https://render.com).

- [Published site](https://nlw-connect-react-three.vercel.app)
- [Frontend repository](https://github.com/susankizawa/nlw-connect-react)
- [Backend API docs](https://nlw-connect-node-js.onrender.com/docs)

## Features

The backend manages event subscriptions and the referral system, using **PostgreSQL** as the main database and **Redis** for fast storage and retrieval of referral invite clicks and ranking data.  

### PostgreSQL + Drizzle
  - PostgreSQL is used to store subscriber data, including:  
    - `id` (UUID) - randomly generated unique subscriber identifier  
    - `name` (STRING) - subscriber name  
    - `email` (STRING) - unique subscriber email  
    - `created_at` (TIMESTAMP) - date and time of subscription  
  - Database schema management and communication are handled with **Drizzle**.  

### Referral System and Ranking with Redis
  - **Invite link click count**  
    - Stored in a **hash** (`referral:access-count`), where the key is the subscriber's `id` and the value is the number of clicks on their invite link.  
    - Format: `{id: num_clicks}`  
  - **Ranking of successful referrals**  
    - Uses a **sorted set** (`referral:ranking`), where the member is the subscriber's `id` and the score represents the number of successful referrals.  
    - The **sorted set** allows efficient retrieval of rankings in descending order and selecting a specific range, such as the **top 3 subscribers**.  

### Invite Link and Referrer Tracking
  - The invite link redirects users to the event subscription page while passing the **referrer ID** through search parameters in the URL.  
  - This enables two key operations:  
    - Incrementing the number of **successful referrals** in the sorted set:  
      ```bash
      ZINCRBY referral:ranking 1 <referrerId>
      ```
    - Incrementing the **click count** for the referrer's invite link in the hash:  
      ```bash
      HINCRBY referral:access-count <referrerId> 1
      ```

### Docker for Development & Testing
  - Docker is used to quickly spin up **PostgreSQL and Redis containers** in local development and testing environments.  

## Setup

- [Docker installation instructions for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- `docker-compose pull` - pulls the latest image for each service defined in `docker-compose.yml`
- `docker-compose up -d` - starts up all containers for the services you've defined in `docker-compose.yml` in detached mode (runs in the background)
- `npx drizzle-kit generate` - command to create migration files based on the schema defined in `drizzle.config.ts`.
- `npx drizzle-kit migrate` - command to apply the generated migrations and create the tables in the database based on the schema
- `npm install`: command to install project dependencies
- `npm run dev`: command to start project in development mode
- `npm run start`: command to start project in production mode

## Additional Commands

- `docker ps` - Lists all running containers. You can use this to get the service names of the containers.
  
- `docker exec -it <service_name> psql -h localhost -p 5432 -U docker connect` - Connects to the PostgreSQL Docker container as the user `docker` on the `connect` database in interactive mode. You'll be prompted for a password after running this command.

- `docker exec -it <service_name> redis-cli` - Connects to the Redis Docker container in interactive mode, allowing you to interact with the Redis instance.

### Notes
- `<service_name>`: Replace this with the actual name or ID of the running service/container (you can get this from `docker ps`).
- The `-it` flag stands for interactive and terminal, which allows you to interact with the shell of the container.

## Tecnologies used

- [Fastify](https://fastify.dev)
- [Cors](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
- [Drizzle](https://orm.drizzle.team)
- [Ioredis](https://github.com/redis/ioredis)
- [PostgreSQL](https://www.postgresql.org)
- [Zod](https://zod.dev)
- [Typescript](https://www.typescriptlang.org)
- [Docker](https://www.docker.com)
- [Swagger](https://swagger.io)

## Future improvements
