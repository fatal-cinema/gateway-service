import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString, IsString, Length, Matches } from 'class-validator'

export class ConfirmPhoneChangeRequest {
	@ApiProperty({
		example: '+79920543892',
	})
	@IsString()
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	phone: string

	@ApiProperty({
		example: '123456',
	})
	@IsNumberString()
	@IsNotEmpty()
	@Length(6, 6)
	code: string
}
