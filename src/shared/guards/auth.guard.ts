import { PassportService } from '@fatal-cinema/passport'
import { Injectable, UnauthorizedException, type CanActivate, type ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Request } from 'express'

import { IS_PUBLIC_KEY } from '@shared/decorators'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly passportService: PassportService
	) {}

	canActivate(context: ExecutionContext): boolean {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
		if (isPublic) return true

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
