import { saveShortenedUrl } from '@/app/usecases/save-shortened-url'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createShortenedUrl: FastifyPluginAsyncZod = async server => {
	server.post(
		'/shortened-urls',
		{
			schema: {
				summary: 'Create a shortened URL',
				tags: ['shortened-urls'],
				body: z.object({
					originalUrl: z.string().url(),
					shortenedUrl: z.string(),
				}),
				response: {
					201: z.object({
						id: z.string(),
					}),
					400: z.object({
						message: z.string(),
					}),
					409: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { originalUrl, shortenedUrl } = request.body

			const result = await saveShortenedUrl({ originalUrl, shortenedUrl })

			if (isRight(result)) {
				const data = unwrapEither(result)
				return reply.status(201).send({ id: data.id })
			}

			const error = unwrapEither(result)

			return reply.status(409).send({ message: error.message })
		}
	)
}
