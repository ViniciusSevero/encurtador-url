import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { Either } from '@/infra/shared/either'
import { makeRight } from '@/infra/shared/either'

interface ListShortenedUrlsOutput {
	items: {
		id: string
		shortenedUrl: string
		originalUrl: string
		accessCount: number
		createdAt: Date
	}[]
}

export async function listShortenedUrls(): Promise<
	Either<never, ListShortenedUrlsOutput>
> {
	const response = await db
		.select({
			id: schema.shortenedUrls.id,
			shortenedUrl: schema.shortenedUrls.shortenedUrl,
			originalUrl: schema.shortenedUrls.originalUrl,
			accessCount: schema.shortenedUrls.accessCount,
			createdAt: schema.shortenedUrls.createdAt,
		})
		.from(schema.shortenedUrls)

	return makeRight({
		items: response,
	})
}
