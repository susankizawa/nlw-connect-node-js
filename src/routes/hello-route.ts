import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const hello: FastifyPluginAsyncZod = async app => {
  app.get(
    '/hello',
    {
      schema: {
        operationId: 'helloWorld',
        summary: 'Greets the world',
        tags: ['test'],
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      return { message: 'Hello World!' }
    }
  )
}
