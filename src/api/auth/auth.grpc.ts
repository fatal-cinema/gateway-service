import {
	AUTH_SERVICE_NAME,
	type AuthServiceClient,
	type SendOtpRequest,
	type SendOtpResponse,
	type VerifyOtpRequest,
	type VerifyOtpResponse,
} from '@fatal-cinema/contracts/gen/auth'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { type ClientGrpc } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGrpcClient implements OnModuleInit, AuthServiceClient {
	private authService: AuthServiceClient

	constructor(@Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
	}

	sendOtp(request: SendOtpRequest): Observable<SendOtpResponse> {
		return this.authService.sendOtp(request)
	}

	verifyOtp(request: VerifyOtpRequest): Observable<VerifyOtpResponse> {
		return this.authService.verifyOtp(request)
	}
}
