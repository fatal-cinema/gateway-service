import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, Validate } from 'class-validator'

import { IdentifierValidator } from '@shared/validators'

export class SendOtpRequest {
	@ApiProperty({
		example: '+79920543892',
	})
	@IsString()
	@Validate(IdentifierValidator)
	identifier: string

	@ApiProperty({
		example: 'phone',
		enum: ['phone', 'email'],
	})
	@IsEnum(['phone', 'email'])
	type: 'phone' | 'email'
}
