import { catchError, map, Observable, throwError } from 'rxjs';

import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { IApiResponse, ResponseStatus } from '../../interface/response.interface';

export type RestReply<T extends object> = {
    status?: ResponseStatus
} & T

const useDefault = <T>(def?: T, value?: T): T | undefined => {
    return value === undefined ? def : value
}

type AnyResponse = Record<string, never>

@Injectable()
export class RestAPIResponseInterceptor<T = AnyResponse>
    implements NestInterceptor<T, IApiResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<IApiResponse<T>> {
        if (context.getType() !== 'http') {
            return next.handle()
        }

        const http = context.switchToHttp()
        const request = http.getRequest()
        const { headers } = request
        const requestId = headers['x-request-id']

        return next.handle().pipe(
            map((data: RestReply<any>) => {
                const input = (Array.isArray(data) ? undefined : data) || {}
                const { status, ...result } = input
                return {
                    requestId,
                    status: useDefault(ResponseStatus.SUCCESS, status),
                    data: Array.isArray(data)
                        ? data
                        : useDefault(
                              status !== undefined ? undefined : data,
                              result,
                          ),
                }
            }),
            catchError((err) => {
                const response = { status: ResponseStatus.FAILURE, error: { message: err.message }}
                return throwError(() => new HttpException(response, HttpStatus.BAD_REQUEST))
            }),
        )
    }
}
