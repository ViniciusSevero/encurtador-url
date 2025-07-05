import { exportShortenedUrls } from '@/app/usecases/export-shortened-urls'
import { unwrapEither } from '@/infra/shared/either'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const generateReport: FastifyPluginAsyncZod = async server => {
	server.get(
		'/report',
		{
			schema: {
				summary: 'Get the original URL by a shortened URL',
				tags: ['report'],
				response: {
					200: z.object({
						reportUrl: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const result = await exportShortenedUrls({ searchQuery: undefined })

			const { reportUrl } = unwrapEither(result)
			return reply.status(200).send({ reportUrl })
		}
	)
}
