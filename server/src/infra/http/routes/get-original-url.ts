import { getOriginalUrlByShortenedUrl } from '@/app/usecases/get-original-url-by-shortened-url'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getOriginalUrl: FastifyPluginAsyncZod = async server => {
	server.get(
		'/shortened-urls/:shortenedUrl/original-url',
		{
			schema: {
				summary: 'Get the original URL by a shortened URL',
				tags: ['shortened-urls'],
				params: z.object({
					shortenedUrl: z.string(),
				}),
				response: {
					200: z.object({
						originalUrl: z.string(),
					}),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { shortenedUrl } = request.params

			const result = await getOriginalUrlByShortenedUrl({ shortenedUrl })

			if (isRight(result)) {
				const { originalUrl } = unwrapEither(result)
				return reply.status(200).send({ originalUrl })
			}

			const error = unwrapEither(result)
			return reply.status(404).send({ message: error.message })
		}
	)
}
