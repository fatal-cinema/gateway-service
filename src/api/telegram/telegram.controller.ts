import { atob } from 'node:buffer'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation } from '@nestjs/swagger'
import type { Response } from 'express'
import { lastValueFrom } from 'rxjs'

import { Public } from '@shared/decorators'
import { isDev } from '@shared/utils'

import { TelegramVerifyRequest } from './dto'
import { TelegramGrpcClient } from './telegram.grpc'

@Controller('telegram')
export class TelegramController {
	constructor(
		private readonly client: TelegramGrpcClient,
		private readonly configService: ConfigService
	) {}

	@ApiOperation({})
	@Public()
	@Get('init')
	@HttpCode(HttpStatus.OK)
	async telegramInit() {
		return this.client.telegramInit()
	}

	@ApiOperation({})
	@Public()
	@Post('verify')
	@HttpCode(HttpStatus.OK)
	async telegramVerify(@Body() dto: TelegramVerifyRequest, @Res({ passthrough: true }) res: Response) {
		const query = JSON.parse(atob(dto.tgAuthResult))

		const result = await lastValueFrom(this.client.telegramVerify({ query }))

		if ('url' in result && result.url) {
			return result
		}

		if (result.accessToken && result.refreshToken) {
			const { refreshToken, accessToken } = result

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: !isDev(this.configService),
				domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
				sameSite: 'lax',
				maxAge: 30 * 24 * 60 * 60 * 1000,
			})

			return { accessToken }
		}

		throw new UnauthorizedException('Invalid Telegram login response')
	}
}
