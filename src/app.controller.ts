import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { Public } from '@shared/decorators'
import { HealthResponse } from '@shared/responses'

import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOperation({
		summary: 'Welcome endpoint',
		description: 'Return a simple API welcome message.',
	})
	@Public()
	@Get()
	getHello() {
		return this.appService.getHello()
	}

	@ApiOperation({
		summary: 'Health check',
		description: 'Checks if Gateway is running.',
	})
	@ApiOkResponse({
		type: HealthResponse,
	})
	@Public()
	@Get('health')
	health() {
		return this.appService.health()
	}
}
