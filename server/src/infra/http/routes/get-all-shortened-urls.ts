import { listShortenedUrls } from '@/app/usecases/list-shortened-urls'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getAlShortenedUrls: FastifyPluginAsyncZod = async server => {
	server.get(
		'/shortened-urls',
		{
			schema: {
				summary: 'Get all shortened URLs',
				tags: ['shortened-urls'],

				response: {
					200: z.object({
						items: z.array(
							z.object({
								id: z.string(),
								originalUrl: z.string().url(),
								shortenedUrl: z.string(),
								accessCount: z.number(),
								createdAt: z.date(),
							})
						),
					}),
					500: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const result = await listShortenedUrls()

			if (isRight(result)) {
				const { items } = unwrapEither(result)
				return reply.status(200).send({ items })
			}

			return reply.status(500).send({ message: 'Internal server error' })
		}
	)
}
