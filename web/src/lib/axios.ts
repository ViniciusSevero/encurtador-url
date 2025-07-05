import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
    baseURL: env.VITE_BACKEND_URL,
    withCredentials: true
})

if(env.VITE_ENABLE_API_DELAY){
    api.interceptors.request.use(async config => {
        await new Promise((resolve) => setTimeout(resolve, Math.fround(Math.random() * 1000)))

        return config
    })
}