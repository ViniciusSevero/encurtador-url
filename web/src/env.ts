import { z } from 'zod'

const envSchema = z.object({
    MODE: z.enum(['production', 'development', 'test']),
    VITE_FRONTEND_URL: z.string(),
    VITE_BACKEND_URL: z.string(),
    VITE_ENABLE_API_DELAY: z.string().transform(value => value === 'true')
})

export const env = envSchema.parse(import.meta.env)

