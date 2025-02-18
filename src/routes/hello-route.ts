import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const hello: FastifyPluginAsyncZod = async app => {
  app.get('/hello', () => {
    return 'Hello World!'
  })
}
