import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { makeShortenedUrl } from '@/test/factories/make-shorened-url'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { UrlNotFound } from './errors/url-not-found'
import { getOriginalUrlByShortenedUrl } from './get-original-url-by-shortened-url'

describe('Get original url by a shortened url', () => {
	it('should be able to get the original url by an shortened url', async () => {
		const shortenedUrl = randomUUID()

		await makeShortenedUrl({
			shortenedUrl,
			originalUrl: 'http://localhost:3333',
		})

		const sut = await getOriginalUrlByShortenedUrl({ shortenedUrl })

		expect(isRight(sut)).toBe(true)
		expect(sut.right?.originalUrl).toBe('http://localhost:3333')
	})

	it('should not be able to get the original url by an unexistent shortened url', async () => {
		const shortenedUrl = randomUUID()

		const sut = await getOriginalUrlByShortenedUrl({ shortenedUrl })

		expect(isLeft(sut)).toBe(true)
		expect(unwrapEither(sut)).toBeInstanceOf(UrlNotFound)
	})
})
