import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getRankingRoute } from './routes/get-ranking-route'
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { hello } from './routes/hello-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: env.FRONTEND_URL,
})

// Setting up automatic documentation with Swagger

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Registering routes

app.register(hello)
app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

// Listening

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`"Server running in http://localhost:${env.PORT}`)
  })
