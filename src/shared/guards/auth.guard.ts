import { PassportService } from '@fatal-cinema/passport'
import { Injectable, UnauthorizedException, type CanActivate, type ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly passportService: PassportService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest()

		const token = this.extractToken(request)

		const result = this.passportService.verify(token)

		if (!result.valid) {
			throw new UnauthorizedException(result.reason)
		}

		request.user = {
			id: result.userId,
		}

		return true
	}

	private extractToken(request: Request): string {
		const header = request.headers.authorization

		if (!header) {
			throw new UnauthorizedException('Authorization header missing')
		}
		if (!header.startsWith('Bearer ')) throw new UnauthorizedException('Invalid token format')

		const token = header.replace(/^Bearer\s+/i, '').trim()

		if (!token) throw new UnauthorizedException('Token empty')

		return token
	}
}
