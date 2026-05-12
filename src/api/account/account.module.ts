import { PROTO_PATHS } from '@fatal-cinema/contracts'
import { ACCOUNT_SERVICE_NAME, ACCOUNT_V1_PACKAGE_NAME } from '@fatal-cinema/contracts/gen/account'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AccountController } from './account.controller'
import { AccountGrpcClient } from './account.grpc'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: ACCOUNT_SERVICE_NAME,
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: ACCOUNT_V1_PACKAGE_NAME,
						protoPath: PROTO_PATHS.ACCOUNT,
						url: configService.getOrThrow<string>('ACCOUNT_GRPC_URL'),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [AccountController],
	providers: [AccountGrpcClient],
	exports: [AccountGrpcClient],
})
export class AccountModule {}
