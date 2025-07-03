import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { Either } from '@/infra/shared/either'
import { makeRight } from '@/infra/shared/either'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { stringify } from 'csv-stringify'
import { ilike } from 'drizzle-orm'
import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { z } from 'zod'

const exportShortenedUrlsInput = z.object({
	searchQuery: z.string().optional(),
})

type ExportShortenedUrlsInput = z.input<typeof exportShortenedUrlsInput>

type ExportShortenedUrlsOutput = {
	reportUrl: string
}

export async function exportShortenedUrls({
	searchQuery,
}: ExportShortenedUrlsInput): Promise<
	Either<never, ExportShortenedUrlsOutput>
> {
	const { params, sql } = db
		.select({
			shortenedUrl: schema.shortenedUrls.shortenedUrl,
			originalUrl: schema.shortenedUrls.originalUrl,
			accessCount: schema.shortenedUrls.accessCount,
			createdAt: schema.shortenedUrls.createdAt,
		})
		.from(schema.shortenedUrls)
		.where(
			searchQuery
				? ilike(schema.shortenedUrls.shortenedUrl, `%${searchQuery}%`)
				: undefined
		)
		.toSQL()

	const cursor = pg.unsafe(sql, params as string[]).cursor(2)

	const csv = stringify({
		delimiter: ',',
		header: true,
		columns: [
			{ key: 'shortened_url', header: 'URL encurtada' },
			{ key: 'original_url', header: 'URL original' },
			{ key: 'access_count', header: 'Contagem de acessos' },
			{ key: 'created_at', header: 'Data de criação' },
		],
	})

	const uploadToStorageStream = new PassThrough()

	const convertToCsvPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], _, callback) {
				for (const chunk of chunks) {
					this.push(chunk)
				}

				callback()
			},
		}),
		csv,
		uploadToStorageStream
	)

	const uploadToStorage = uploadFileToStorage({
		contentType: 'text/csv',
		folder: 'downloads',
		fileName: `${new Date().toISOString()}-shortened-urls-report.csv`,
		contentStream: uploadToStorageStream,
	})

	const [{ url }] = await Promise.all([uploadToStorage, convertToCsvPipeline])

	return makeRight({ reportUrl: url })
}
