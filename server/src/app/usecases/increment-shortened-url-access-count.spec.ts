import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, unwrapEither } from '@/infra/shared/either'
import { makeShortenedUrl } from '@/test/factories/make-shorened-url'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { UrlNotFound } from './errors/url-not-found'
import { incrementShortenedUrlAccessCount } from './increment-shortened-url-access-count'

describe('Increment shortened urls access count', () => {
	it('should be able to increment shortened url access count', async () => {
		const shortenedUrl = randomUUID()

		const { id } = await makeShortenedUrl({ shortenedUrl })

		const [preUpdate] = await db
			.select({
				accessCount: schema.shortenedUrls.accessCount,
			})
			.from(schema.shortenedUrls)
			.where(eq(schema.shortenedUrls.id, id))

		expect(preUpdate.accessCount).toBe(0)

		await incrementShortenedUrlAccessCount({ id })

		const [posUpdate] = await db
			.select({
				accessCount: schema.shortenedUrls.accessCount,
			})
			.from(schema.shortenedUrls)
			.where(eq(schema.shortenedUrls.id, id))

		expect(posUpdate.accessCount).toBe(1)
	})

	it('should not be able to increment shortened url that not exists', async () => {
		const sut = await incrementShortenedUrlAccessCount({ id: 'non-ecziste' })

		expect(isLeft(sut)).toBe(true)
		expect(unwrapEither(sut)).toBeInstanceOf(UrlNotFound)
	})
})
