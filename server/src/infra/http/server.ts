import { env } from '@/env'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { createShortenedUrl } from './routes/create-shortened-url'
import { deleteShortenedUrl } from './routes/delete-shortened-url'
import { generateReport } from './routes/generate-report'
import { getAlShortenedUrls } from './routes/get-all-shortened-urls'
import { getOriginalUrl } from './routes/get-original-url'
import { updateShortenedUrlAccessCount } from './routes/update-shortened-url-access-count'
import { transformSwaggerSchema } from './transform-swagger-schema'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: error.validation,
		})
	}

	// Envia o erro p/ alguma ferramenta de observabilidade (Sentry/DataDog/Grafana/OTel)

	console.error(error)

	return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Upload Server',
			version: '1.0.0',
		},
	},
	transform: transformSwaggerSchema,
})

server.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

server.register(createShortenedUrl)
server.register(deleteShortenedUrl)
server.register(getOriginalUrl)
server.register(getAlShortenedUrls)
server.register(updateShortenedUrlAccessCount)
server.register(generateReport)

console.log(env.DATABASE_URL)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.log('HTTP Server running!')
})
