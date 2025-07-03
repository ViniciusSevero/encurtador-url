import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const removeShortenedUrlInput = z.object({
	id: z.string(),
})

type RemoveShortenedUrlInput = z.input<typeof removeShortenedUrlInput>

export async function removeShortenedUrl(data: RemoveShortenedUrlInput) {
	const { id } = removeShortenedUrlInput.parse(data)

	await db.delete(schema.shortenedUrls).where(eq(schema.shortenedUrls.id, id))
}
