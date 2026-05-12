import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class InitPhoneChangeRequest {
	@ApiProperty({
		example: '+79920543892',
	})
	@IsString()
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	phone: string
}
