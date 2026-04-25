import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { SendOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	constructor() {}

	@ApiOperation({
		summary: 'Send otp code',
		description: 'Sends a verification code to user phone number or email',
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	async sendOtp(@Body() dto: SendOtpRequest) {
		console.log('DATA: ', dto)

		return { ok: true }
	}
}
