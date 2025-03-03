import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          operationId: 'getSubscriberInvitesCount',
          summary: 'Get subscriber invites count',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              inviteCount: z.number(),
            }),
          },
        },
      },
      async (req, res) => {
        const { subscriberId } = req.params

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return { inviteCount: count }
      }
    )
  }
