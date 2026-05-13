import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TelegramVerifyRequest {
	@ApiProperty({
		example: 'eyKAWwoviawAWkviawCn0awmvaiw12wskcc...',
	})
	@IsString()
	@IsNotEmpty()
	tgAuthResult: string
}
