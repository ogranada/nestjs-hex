import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response } from 'express';

export class DomainExceptionFilter implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.constructor instanceof Error? 500 : exception.getStatus();
    const message = exception.message;

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
  }

}
