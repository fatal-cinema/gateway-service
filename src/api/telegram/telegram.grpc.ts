import {
	TELEGRAM_SERVICE_NAME,
	TelegramCompleteRequest,
	TelegramCompleteResponse,
	TelegramConsumeRequest,
	TelegramConsumeResponse,
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

	telegramComplete(request: TelegramCompleteRequest): Observable<TelegramCompleteResponse> {
		return this.telegramService.telegramComplete(request)
	}

	telegramConsume(request: TelegramConsumeRequest): Observable<TelegramConsumeResponse> {
		return this.telegramService.telegramConsume(request)
	}
}
