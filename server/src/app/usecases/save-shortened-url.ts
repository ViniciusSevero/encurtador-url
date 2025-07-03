import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { Either } from '@/infra/shared/either'
import { makeLeft, makeRight } from '@/infra/shared/either'
import { count, eq } from 'drizzle-orm'
import { z } from 'zod'
import { ShortenedUrlAlreadyExists } from './errors/shortened-url-already-exists'

const createShortenedUrlInput = z.object({
	originalUrl: z.string().url(),
	shortenedUrl: z.string(),
})

type CreateShortenedUrlInput = z.input<typeof createShortenedUrlInput>

export async function saveShortenedUrl(
	data: CreateShortenedUrlInput
): Promise<Either<ShortenedUrlAlreadyExists, { id: string }>> {
	const { originalUrl, shortenedUrl } = createShortenedUrlInput.parse(data)

	const [{ total }] = await db
		.select({
			total: count(schema.shortenedUrls.id),
		})
		.from(schema.shortenedUrls)
		.where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

	if (total) {
		return makeLeft(new ShortenedUrlAlreadyExists())
	}

	const [{ insertedId }] = await db
		.insert(schema.shortenedUrls)
		.values({
			originalUrl,
			shortenedUrl,
		})
		.returning({ insertedId: schema.shortenedUrls.id })

	return makeRight({ id: insertedId })
}
