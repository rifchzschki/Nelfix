// transform-response.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import { ResponseDto } from '../../shared/dto/response.dto';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // Mengubah format respons menjadi ResponseDto
        return {
          status: 'success',
          message: 'Request processed successfully',
          data: data,
        } as ResponseDto<any>;
      }),
      catchError((error) => {
        // Menangani error di sini
        console.error('Error occurred:', error);

        // Mengembalikan format error dengan ResponseDto
        const responseDto: ResponseDto<null> = {
          status: 'error',
          message: error.message || 'An unexpected error occurred',
          data: null,
        };

        // Menggunakan HttpException untuk mengirimkan respons error
        throw new HttpException(responseDto, HttpStatus.INTERNAL_SERVER_ERROR);
      })
    );
  }
}
