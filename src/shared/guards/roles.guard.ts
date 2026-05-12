import type { Role } from '@fatal-cinema/contracts/gen/account'
import { ForbiddenException, Injectable, NotFoundException, type CanActivate, type ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { lastValueFrom } from 'rxjs'

import { ROLES_KEY } from '@shared/decorators'
import { AccountGrpcClient } from '@api/account/account.grpc'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly accountClient: AccountGrpcClient
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

		if (!requiredRoles || requiredRoles.length === 0) return true

		const request = context.switchToHttp().getRequest()

		const user = request.user

		if (!user) throw new ForbiddenException('User context missing')

		const account = await lastValueFrom(this.accountClient.getAccount({ id: user.id }))

		if (!account) throw new NotFoundException('Account not found')

		if (!requiredRoles.includes(account.role)) throw new ForbiddenException('You do not have permission to access this resource')

		return true
	}
}
