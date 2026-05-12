import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { Authorized, Protected } from '@shared/decorators'

import { AccountGrpcClient } from './account.grpc'
import { ConfirmEmailChangeRequest, ConfirmPhoneChangeRequest, InitEmailChangeRequest, InitPhoneChangeRequest } from './dto'

@Controller('account')
export class AccountController {
	constructor(private readonly client: AccountGrpcClient) {}

	@ApiOperation({
		summary: 'Init email change',
		description: 'Sends confirmation code to a new email address.',
	})
	@Protected()
	@Post('email/change/init')
	@HttpCode(HttpStatus.OK)
	async initEmailChange(@Body() dto: InitEmailChangeRequest, @Authorized() userId: string) {
		return this.client.initEmailChange({ ...dto, userId })
	}

	@ApiOperation({
		summary: 'Confirm email change',
		description: 'Verifies confirmation code and updates user email.',
	})
	@Protected()
	@Post('email/change/confirm')
	@HttpCode(HttpStatus.OK)
	async confirmEmailChange(@Body() dto: ConfirmEmailChangeRequest, @Authorized() userId: string) {
		return this.client.confirmEmailChange({ ...dto, userId })
	}

	@ApiOperation({
		summary: 'Init phone change',
		description: 'Sends confirmation code to a new phone number.',
	})
	@Protected()
	@Post('phone/change/init')
	@HttpCode(HttpStatus.OK)
	async initPhoneChange(@Body() dto: InitPhoneChangeRequest, @Authorized() userId: string) {
		return this.client.initPhoneChange({ ...dto, userId })
	}

	@ApiOperation({
		summary: 'Confirm phone change',
		description: 'Verifies confirmation code and updates user phone number.',
	})
	@Protected()
	@Post('phone/change/confirm')
	@HttpCode(HttpStatus.OK)
	async confirmPhoneChange(@Body() dto: ConfirmPhoneChangeRequest, @Authorized() userId: string) {
		return this.client.confirmPhoneChange({ ...dto, userId })
	}
}
