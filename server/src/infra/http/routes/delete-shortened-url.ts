import { removeShortenedUrl } from '@/app/usecases/remove-shortened-url'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteShortenedUrl: FastifyPluginAsyncZod = async server => {
	server.delete(
		'/shortened-urls/:id',
		{
			schema: {
				summary: 'Delete a shortened URL',
				tags: ['shortened-urls'],
				params: z.object({
					id: z.string(),
				}),
				response: {
					204: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params

			await removeShortenedUrl({ id })

			return reply.status(204).send()
		}
	)
}
