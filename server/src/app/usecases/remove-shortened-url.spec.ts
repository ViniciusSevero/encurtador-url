import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeShortenedUrl } from '@/test/factories/make-shorened-url'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { removeShortenedUrl } from './remove-shortened-url'

describe('Remove shortened urls', () => {
	it('should be able to remove a shortened url', async () => {
		const shortenedUrl = randomUUID()

		const { id } = await makeShortenedUrl({ shortenedUrl })

		const result = await db
			.select()
			.from(schema.shortenedUrls)
			.where(eq(schema.shortenedUrls.id, id))

		expect(result).toHaveLength(1)

		await removeShortenedUrl({ id })

		const sut = await db
			.select()
			.from(schema.shortenedUrls)
			.where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

		expect(sut).toHaveLength(0)
	})
})
