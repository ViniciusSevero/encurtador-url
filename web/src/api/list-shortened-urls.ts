import { api } from "@/lib/axios";

export interface ListShortenedUrlsOutput {
	items: {
		id: string
		shortenedUrl: string
		originalUrl: string
		accessCount: number
		createdAt: Date
	}[]
}

export async function listShortenedUrls() {
    const response = await api.get<ListShortenedUrlsOutput>('/shortened-urls')

    return response.data
}