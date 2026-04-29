import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumberString, IsString, Length, Validate } from 'class-validator'

import { IdentifierValidator } from '@shared/validators'

export class VerifyOtpRequest {
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

	@ApiProperty({
		example: '123456',
	})
	@IsNumberString()
	@IsNotEmpty()
	@Length(6, 6)
	code: string
}
