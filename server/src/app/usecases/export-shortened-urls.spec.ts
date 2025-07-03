import { isRight, unwrapEither } from '@/infra/shared/either'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { makeShortenedUrl } from '@/test/factories/make-shorened-url'
import { randomUUID } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { exportShortenedUrls } from './export-shortened-urls'

describe('export shortened urls', () => {
	it('should be able to export uploads', async () => {
		const uploadStub = vi
			.spyOn(upload, 'uploadFileToStorage')
			.mockImplementationOnce(async () => {
				return {
					key: `${randomUUID()}.csv`,
					url: 'http://example.com/file.csv',
				}
			})

		const namePattern = randomUUID()

		const url1 = await makeShortenedUrl({ shortenedUrl: `url1-${namePattern}` })
		const url2 = await makeShortenedUrl({ shortenedUrl: `url2-${namePattern}` })
		const url3 = await makeShortenedUrl({ shortenedUrl: `url3-${namePattern}` })
		const url4 = await makeShortenedUrl({ shortenedUrl: `url4-${namePattern}` })
		const url5 = await makeShortenedUrl({ shortenedUrl: `url5-${namePattern}` })

		const sut = await exportShortenedUrls({ searchQuery: namePattern })

		// primeira chamada / primeiro parametro
		const generatedCsvStream = uploadStub.mock.calls[0][0].contentStream

		const csvAsString = await new Promise<string>((resolve, reject) => {
			const chunks: Buffer[] = []

			generatedCsvStream.on('data', (chunk: Buffer) => {
				chunks.push(chunk)
			})

			generatedCsvStream.on('end', () => {
				resolve(Buffer.concat(chunks).toString('utf-8'))
			})

			generatedCsvStream.on('error', error => {
				reject(error)
			})
		})

		const csvAsArray = csvAsString
			.trim()
			.split('\n')
			.map(row => row.split(','))

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).reportUrl).toBe('http://example.com/file.csv')
		expect(csvAsArray).toEqual([
			[
				'URL encurtada',
				'URL original',
				'Contagem de acessos',
				'Data de criação',
			],
			[
				url1.shortenedUrl,
				url1.originalUrl,
				url1.accessCount.toString(),
				expect.any(String),
			],
			[
				url2.shortenedUrl,
				url2.originalUrl,
				url2.accessCount.toString(),
				expect.any(String),
			],
			[
				url3.shortenedUrl,
				url3.originalUrl,
				url3.accessCount.toString(),
				expect.any(String),
			],
			[
				url4.shortenedUrl,
				url4.originalUrl,
				url4.accessCount.toString(),
				expect.any(String),
			],
			[
				url5.shortenedUrl,
				url5.originalUrl,
				url5.accessCount.toString(),
				expect.any(String),
			],
		])
	})
})
