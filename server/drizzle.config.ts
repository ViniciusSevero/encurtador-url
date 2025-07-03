import { env } from '@/env'
import type { Config } from 'drizzle-kit'

console.log(env.DATABASE_URL)

export default {
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	dialect: 'postgresql',
	schema: 'src/infra/db/schemas/*',
	out: 'src/infra/db/migrations',
} satisfies Config
