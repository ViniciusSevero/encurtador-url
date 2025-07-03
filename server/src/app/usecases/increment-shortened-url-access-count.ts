import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeLeft, makeRight, type Either } from '@/infra/shared/either'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { UrlNotFound } from './errors/url-not-found'

const incrementShortenedUrlAccessCountInput = z.object({
	id: z.string(),
})

type IncrementShortenedUrlAccessCountInput = z.input<
	typeof incrementShortenedUrlAccessCountInput
>

export async function incrementShortenedUrlAccessCount(
	data: IncrementShortenedUrlAccessCountInput
): Promise<Either<UrlNotFound, { id: string }>> {
	const { id } = incrementShortenedUrlAccessCountInput.parse(data)

	const response = await db
		.select({
			originalUrl: schema.shortenedUrls.originalUrl,
		})
		.from(schema.shortenedUrls)
		.where(eq(schema.shortenedUrls.id, id))

	if (response.length === 0) {
		return makeLeft(new UrlNotFound())
	}

	await db
		.update(schema.shortenedUrls)
		.set({
			accessCount: sql`${schema.shortenedUrls.accessCount} + 1`,
		})
		.where(eq(schema.shortenedUrls.id, id))

	return makeRight({ id })
}
