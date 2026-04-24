import { ApiProperty } from '@nestjs/swagger'

export class HealthResponse {
	@ApiProperty({
		example: 'ok',
	})
	status: string

	@ApiProperty({
		example: '2026-04-24T15:11:46.595Z',
	})
	timestamp: string
}
