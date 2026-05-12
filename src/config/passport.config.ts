import { PassportOptions } from '@fatal-cinema/passport'
import { ConfigService } from '@nestjs/config'

export function getPassportConfig(configService: ConfigService): PassportOptions {
	return {
		secretKey: configService.getOrThrow<string>('PASSPORT_SECRET'),
	}
}
