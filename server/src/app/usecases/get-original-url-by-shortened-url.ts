import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { Either } from '@/infra/shared/either'
import { makeLeft, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { UrlNotFound } from './errors/url-not-found'

const getOriginalUrlByShortenedUrlInput = z.object({
	shortenedUrl: z.string(),
})

type GetOriginalUrlByShortenedUrlInput = z.input<
	typeof getOriginalUrlByShortenedUrlInput
>

type GetOriginalUrlByShortenedUrlOutput = {
	id: string
	originalUrl: string
}

export async function getOriginalUrlByShortenedUrl(
	data: GetOriginalUrlByShortenedUrlInput
): Promise<Either<UrlNotFound, GetOriginalUrlByShortenedUrlOutput>> {
	const { shortenedUrl } = getOriginalUrlByShortenedUrlInput.parse(data)

	const response = await db
		.select({
			id: schema.shortenedUrls.id,
			originalUrl: schema.shortenedUrls.originalUrl,
		})
		.from(schema.shortenedUrls)
		.where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

	if (response.length === 0) {
		return makeLeft(new UrlNotFound())
	}

	const [{ id, originalUrl }] = response
	return makeRight({ id, originalUrl })
}
