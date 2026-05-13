import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TelegramFinalizeRequest {
	@ApiProperty({
		example: '214e97a553bba88a5224927a9bbca19b',
	})
	@IsString()
	@IsNotEmpty()
	sessionId: string
}
