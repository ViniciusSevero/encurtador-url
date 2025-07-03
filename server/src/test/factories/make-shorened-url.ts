import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { InferInsertModel } from 'drizzle-orm'

export async function makeShortenedUrl(
	overrides?: Partial<InferInsertModel<typeof schema.shortenedUrls>>
) {
	const result = await db
		.insert(schema.shortenedUrls)
		.values({
			originalUrl: 'http://localhost:3333',
			shortenedUrl: 'my-app',
			...overrides,
		})
		.returning()

	return result[0]
}
