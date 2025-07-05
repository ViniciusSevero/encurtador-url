import { api } from "@/lib/axios";

export interface DeleteShortenedUrlInput {
	id: string
}

export async function deleteShortenedUrl({id}: DeleteShortenedUrlInput) {
    const response = await api.delete<DeleteShortenedUrlInput>(`/shortened-urls/${id}`)

    return response.data
}