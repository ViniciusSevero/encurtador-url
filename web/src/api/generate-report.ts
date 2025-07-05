import { api } from "@/lib/axios";

export interface GenerateReportOutput {
	reportUrl: string
}

export async function generateReport() {
    const response = await api.get<GenerateReportOutput>(`/report`)

    return response.data
}