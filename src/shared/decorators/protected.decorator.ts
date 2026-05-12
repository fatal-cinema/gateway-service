import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from '@shared/guards'

export const Protected = () => applyDecorators(UseGuards(AuthGuard), ApiBearerAuth())
