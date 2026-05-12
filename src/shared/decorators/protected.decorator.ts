import type { Role } from '@fatal-cinema/contracts/gen/account'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { Roles } from './roles.decorator'

export const Protected = (...roles: Role[]) => {
	if (roles.length === 0) return applyDecorators(ApiBearerAuth())

	return applyDecorators(Roles(...roles), ApiBearerAuth())
}
