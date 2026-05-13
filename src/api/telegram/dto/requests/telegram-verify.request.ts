import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TelegramVerifyRequest {
	@ApiProperty({
		example:
			'eyJpZCI6NzYyOTc0OTMxLCJmaXJzdF9uYW1lIjoiZmF0YWwiLCJ1c2VybmFtZSI6ImZhdGFsX3p4YyIsInBob3RvX3VybCI6Imh0dHBzOlwvXC90Lm1lXC9pXC91c2VycGljXC8zMjBcL2xjTDNHeHN1NmgwcS1UQ1JfY2ZGNXN5WEtGdEhRRGRsd3VYMTVGQzRBdFUuanBnIiwiYXV0aF9kYXRlIjoxNzc4NzA4NjcxLCJoYXNoIjoiMGM0Nzg5MjgwNDM4NTZkYThiODdiYmQwN2Y4NTdiZDc0ODM1MWE5MTViYzVkNjljYmYzNjM4NTcwY2QyMjViYSJ9',
	})
	@IsString()
	@IsNotEmpty()
	tgAuthResult: string
}
