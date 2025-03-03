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

## Commands for Setup

- `$env:BACKEND_URL=BACKEND_URL; npx orval`: command to update backend API methods on Windows to use the URL <BACKEND_URL>
- `npm install`: command to install project dependencies
- `npm run dev`: command to start project in development mode
- `npm run start`: command to start project in production mode

## Tecnologies used

- [React](https://react.dev)
- [Next](https://nextjs.org)
- [Tailwind](https://tailwindcss.com)
- [Typescript](https://www.typescriptlang.org)
- [Zod](https://zod.dev)
- [Orval](https://orval.dev)
- [Vercel](https://vercel.com/home)

## Future improvements
