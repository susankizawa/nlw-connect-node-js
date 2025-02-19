import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3030),
  FRONTEND_URL: z.string().url(),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
