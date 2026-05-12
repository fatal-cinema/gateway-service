import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class InitEmailChangeRequest {
	@ApiProperty({
		example: 'test@test.ru',
	})
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string
}
