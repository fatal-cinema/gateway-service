import { ArgumentsHost, Catch, HttpException, HttpStatus, type ExceptionFilter } from '@nestjs/common'
import { type Response } from 'express'

import { grpcToHttpStatus } from '@shared/utils'

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		if (this.isGrpcError(exception)) {
			const httpStatus = grpcToHttpStatus[exception.code] || 500
			const fields = exception.fields || []

			return response.status(httpStatus).json({
				statusCode: httpStatus,
				message: exception.details || 'gRPC Error',
				fields,
			})
		} else if (exception instanceof HttpException) {
			const status = exception.getStatus()

			return response.status(status).json({
				statusCode: status,
				message: exception.message,
			})
		}

		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			statusCode: 500,
			message: 'Internal Server Error',
		})
	}

	private isGrpcError(exception: any) {
		return typeof exception === 'object' && 'code' in exception && 'details' in exception
	}
}
