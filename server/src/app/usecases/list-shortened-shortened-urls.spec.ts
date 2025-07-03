import { isRight, unwrapEither } from '@/infra/shared/either'
import { makeShortenedUrl } from '@/test/factories/make-shorened-url'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { listShortenedUrls } from './list-shortened-urls'

describe('List shortened urls', () => {
	it('should be able to list shortened urls', async () => {
		const shortenedUrl = randomUUID()

		await makeShortenedUrl({
			shortenedUrl: `teste1-${shortenedUrl}`,
			originalUrl: 'http://localhost:3333',
		})

		await makeShortenedUrl({
			shortenedUrl: `teste2-${shortenedUrl}`,
			originalUrl: 'http://localhost:3333',
		})

		await makeShortenedUrl({
			shortenedUrl: `teste3-${shortenedUrl}`,
			originalUrl: 'http://localhost:3333',
		})

		const sut = await listShortenedUrls()

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).items.length >= 3).toBe(true)
	})
})
