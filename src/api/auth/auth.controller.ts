import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AuthGrpcClient } from './auth.grpc'
import { SendOtpRequest, VerifyOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly client: AuthGrpcClient) {}

	@ApiOperation({
		summary: 'Send otp code',
		description: 'Sends a verification code to user phone number or email.',
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	async sendOtp(@Body() dto: SendOtpRequest) {
		return this.client.sendOtp(dto)
	}

	@ApiOperation({
		summary: 'Verify otp code',
		description: 'Verifies the code sent to user phone number or email and returns a access token.',
	})
	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	async verifyOtp(@Body() dto: VerifyOtpRequest) {
		return this.client.verifyOtp(dto)
	}
}
