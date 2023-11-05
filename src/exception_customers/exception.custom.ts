import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Xử lý exception và định dạng lại response
    response.status(500).json({
      statusCode: 500,
      message: 'Chứng từ có Số Chứng Từ Lỗi',
    });
  }
}