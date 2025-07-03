import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { saveShortenedUrl } from './save-shortened-url'
import { ShortenedUrlAlreadyExists } from './errors/shortened-url-already-exists'

describe('Create shortened urls', () => {
	it('should be able to crete a shortened url', async () => {
		const shortenedUrl = randomUUID()

		const sut = await saveShortenedUrl({
			originalUrl: 'http://test.com',
			shortenedUrl,
		})

		expect(isRight(sut)).toBe(true)

		const result = await db
			.select()
			.from(schema.shortenedUrls)
			.where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

		expect(result).toHaveLength(1)
	})

	it('should not be able to crete a shortened url if it already exists', async () => {
		const shortenedUrl = randomUUID()

		await saveShortenedUrl({
			originalUrl: 'http://test.com',
			shortenedUrl,
		})

		const sut = await saveShortenedUrl({
			originalUrl: 'http://test.com',
			shortenedUrl,
		})

		expect(isLeft(sut)).toBe(true)
		expect(unwrapEither(sut)).toBeInstanceOf(ShortenedUrlAlreadyExists)
	})
})
