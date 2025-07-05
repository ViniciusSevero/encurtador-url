import { api } from "@/lib/axios";

export interface GetOriginalUrlInput {
	shortenedUrl: string
}

export interface GetOriginalUrlOutput {
	id: string
	originalUrl: string
}

export async function getOriginalUrl({shortenedUrl}: GetOriginalUrlInput) {
    const response = await api.get<GetOriginalUrlOutput>(`/shortened-urls/${shortenedUrl}/original-url`)

    return response.data
}