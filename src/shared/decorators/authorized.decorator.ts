import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

export const Authorized = createParamDecorator((_, context: ExecutionContext) => {
	const request = context.switchToHttp().getRequest()

	return request.user.id ?? null
})
