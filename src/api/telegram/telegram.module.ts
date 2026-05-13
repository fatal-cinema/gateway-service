import { PROTO_PATHS } from '@fatal-cinema/contracts'
import { TELEGRAM_SERVICE_NAME, TELEGRAM_V1_PACKAGE_NAME } from '@fatal-cinema/contracts/gen/telegram'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { TelegramController } from './telegram.controller'
import { TelegramGrpcClient } from './telegram.grpc'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: TELEGRAM_SERVICE_NAME,
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: TELEGRAM_V1_PACKAGE_NAME,
						protoPath: PROTO_PATHS.TELEGRAM,
						url: configService.getOrThrow<string>('TELEGRAM_GRPC_URL'),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [TelegramController],
	providers: [TelegramGrpcClient],
})
export class TelegramModule {}
