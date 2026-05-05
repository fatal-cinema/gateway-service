import { PROTO_PATHS } from '@fatal-cinema/contracts'
import { AUTH_SERVICE_NAME, AUTH_V1_PACKAGE_NAME } from '@fatal-cinema/contracts/gen/auth'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AuthController } from './auth.controller'
import { AuthGrpcClient } from './auth.grpc'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: AUTH_SERVICE_NAME,
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: AUTH_V1_PACKAGE_NAME,
						protoPath: PROTO_PATHS.AUTH,
						url: configService.getOrThrow<string>('AUTH_GRPC_URL'),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [AuthController],
	providers: [AuthGrpcClient],
})
export class AuthModule {}
