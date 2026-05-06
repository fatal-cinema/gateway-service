import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation } from '@nestjs/swagger'
import type { Response } from 'express'
import { lastValueFrom } from 'rxjs'

import { isDev } from '@shared/utils'

import { AuthGrpcClient } from './auth.grpc'
import { SendOtpRequest, VerifyOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly client: AuthGrpcClient,
		private readonly configService: ConfigService
	) {}

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
	async verifyOtp(@Body() dto: VerifyOtpRequest, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken } = await lastValueFrom(this.client.verifyOtp(dto))

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: !isDev(this.configService),
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 * 1000,
		})

		return { accessToken }
	}
}
