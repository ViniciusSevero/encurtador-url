import { incrementShortenedUrlAccessCount } from '@/app/usecases/increment-shortened-url-access-count'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const updateShortenedUrlAccessCount: FastifyPluginAsyncZod =
	async server => {
		server.patch(
			'/shortened-urls/:id/access-count',
			{
				schema: {
					summary: 'Update shortened URL access count',
					tags: ['shortened-urls'],
					params: z.object({
						id: z.string(),
					}),
					response: {
						200: z.null(),
						404: z.object({
							message: z.string(),
						}),
					},
				},
			},
			async (request, reply) => {
				const { id } = request.params

				const result = await incrementShortenedUrlAccessCount({
					id,
				})

				if (isRight(result)) {
					return reply.status(200).send()
				}

				const error = unwrapEither(result)

				return reply.status(400).send({ message: error.message })
			}
		)
	}
