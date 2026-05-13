import {
	TELEGRAM_SERVICE_NAME,
	TelegramInitResponse,
	TelegramServiceClient,
	TelegramVerifyRequest,
	TelegramVerifyResponse,
} from '@fatal-cinema/contracts/gen/telegram'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { type ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class TelegramGrpcClient implements OnModuleInit, TelegramServiceClient {
	private telegramService: TelegramServiceClient

	constructor(@Inject(TELEGRAM_SERVICE_NAME) private readonly client: ClientGrpc) {}

	onModuleInit() {
		this.telegramService = this.client.getService<TelegramServiceClient>(TELEGRAM_SERVICE_NAME)
	}

	telegramInit(): Observable<TelegramInitResponse> {
		return this.telegramService.telegramInit({})
	}

	telegramVerify(request: TelegramVerifyRequest): Observable<TelegramVerifyResponse> {
		return this.telegramService.telegramVerify(request)
	}
}
