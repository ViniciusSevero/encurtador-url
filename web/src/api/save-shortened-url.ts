import { api } from "@/lib/axios";

export interface SaveShortenedUrlInput {
	shortenedUrl: string
	originalUrl: string
}

export interface SaveShortenedUrlOutpur {
	id: string
}

export async function saveShortenedUrl({shortenedUrl, originalUrl}: SaveShortenedUrlInput) {
    const response = await api.post<SaveShortenedUrlOutpur>('/shortened-urls', { shortenedUrl, originalUrl})

    return response.data
}