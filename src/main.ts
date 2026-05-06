import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import { GrpcExceptionFilter } from '@shared/filters'

import { AppModule } from './app.module'
import { getCorsConfig, getSwaggerConfig, getValidationPipeConfig } from './config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const logger = new Logger()

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

	app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()))

	app.useGlobalFilters(new GrpcExceptionFilter())

	app.enableCors(getCorsConfig(config))

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
