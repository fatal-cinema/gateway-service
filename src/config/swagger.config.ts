import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
	return new DocumentBuilder()
		.setTitle('FatalCinema API')
		.setDescription('API Gateway for FatalCinema microservices')
		.setVersion(process.env.npm_package_version ?? '1.0.0')
		.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
		.build()
}
