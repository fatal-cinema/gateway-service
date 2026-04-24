import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { getSwaggerConfig } from './config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const logger = new Logger()

	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN').split(','),
		credentials: true,
	})

	const swaggerConfig = getSwaggerConfig()
	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

	SwaggerModule.setup('/docs', app, swaggerDocument, {
		jsonDocumentUrl: 'openapi.json',
		yamlDocumentUrl: 'openapi.yaml',
	})

	const port = config.getOrThrow<number>('APPLICATION_PORT')
	const uri = config.getOrThrow<string>('APPLICATION_URI')

	await app.listen(port)

	logger.log(`🚀 Gateway started: ${uri}`)
	logger.log(`📚 Swagger: ${uri}/docs`)
}
bootstrap()
