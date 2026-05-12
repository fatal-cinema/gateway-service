import {
	ACCOUNT_SERVICE_NAME,
	AccountServiceClient,
	ConfirmEmailChangeRequest,
	ConfirmEmailChangeResponse,
	ConfirmPhoneChangeRequest,
	ConfirmPhoneChangeResponse,
	GetAccountRequest,
	GetAccountResponse,
	InitEmailChangeRequest,
	InitEmailChangeResponse,
	InitPhoneChangeRequest,
	InitPhoneChangeResponse,
} from '@fatal-cinema/contracts/gen/account'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { type ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class AccountGrpcClient implements OnModuleInit, AccountServiceClient {
	private accountService: AccountServiceClient

	constructor(@Inject(ACCOUNT_SERVICE_NAME) private readonly client: ClientGrpc) {}

	onModuleInit() {
		this.accountService = this.client.getService<AccountServiceClient>(ACCOUNT_SERVICE_NAME)
	}

	getAccount(request: GetAccountRequest): Observable<GetAccountResponse> {
		return this.accountService.getAccount(request)
	}

	initEmailChange(request: InitEmailChangeRequest): Observable<InitEmailChangeResponse> {
		return this.accountService.initEmailChange(request)
	}

	confirmEmailChange(request: ConfirmEmailChangeRequest): Observable<ConfirmEmailChangeResponse> {
		return this.accountService.confirmEmailChange(request)
	}

	initPhoneChange(request: InitPhoneChangeRequest): Observable<InitPhoneChangeResponse> {
		return this.accountService.initPhoneChange(request)
	}

	confirmPhoneChange(request: ConfirmPhoneChangeRequest): Observable<ConfirmPhoneChangeResponse> {
		return this.accountService.confirmPhoneChange(request)
	}
}
