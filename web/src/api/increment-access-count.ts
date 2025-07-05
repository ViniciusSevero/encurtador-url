import { api } from "@/lib/axios";

export interface IncrementAccessCountInput {
	id: string
}

export async function incrementAccessCount({id}: IncrementAccessCountInput) {
    const response = await api.patch(`/shortened-urls/${id}/access-count`)

    return response.data
}