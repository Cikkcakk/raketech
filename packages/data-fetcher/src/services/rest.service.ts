import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map, Observable, throwError } from 'rxjs';
import { randomUUID } from 'crypto';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { timestamp } from '../../../common/utils/time.utils';
import { InternalServerException } from '../../../common/error/internal.server.exception';
import { BaseError } from '../../../common/error/base.error';
import { ErrorCode } from '../../../common/error/error.code';

export type QueryParams = {
    [k in string]: string | number
}

export type ApiResponseType<T> = AxiosResponse<T>

const LOGGER_CONTEXT = 'rest.service'

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE',
}

export class RestAPIService {
    constructor(
        private readonly baseUrl: string | undefined,
        private readonly httpService: HttpService,
    ) {}

    async send<Tout = any, Tin = any>(
        method: HttpMethod,
        route: string,
        params?: QueryParams,
        data?: Tin,
        options?: AxiosRequestConfig,
        requestId?: string,
    ): Promise<ApiResponseType<Tout>> {
        return this.request<Tout, Tin>(
            method,
            route,
            params,
            data,
            options,
            requestId,
        )
    }

    async request<Tout = any, Tin = any>(
        method: HttpMethod,
        route: string,
        params?: QueryParams,
        data?: Tin,
        options?: AxiosRequestConfig,
        requestId?: string,
    ): Promise<AxiosResponse<Tout>> {
        const T0 = Date.now()

        let response: Observable<AxiosResponse<Tout>> | undefined = undefined
        const queryString = params
            ? Object.keys(params).reduce((q, p) => {
                  const separator = q.length > 0 ? '&' : '?'
                  return q + `${separator}${p}=${params[p]}`
              }, '')
            : ''
        const baseUri = this.baseUrl ? `${this.baseUrl}/` : ''
        const uri = `${baseUri}${route}${queryString}`
        const requestId$ = requestId || randomUUID()

        /// TODO: log outgoing request

        Logger.warn(
            {
                message: method,
                route: uri,
                transport: 'REST',
                requestId: requestId$,
                timestamp: timestamp(T0),
                params,
                data,
            },
            LOGGER_CONTEXT
        )

        const options$: AxiosRequestConfig = {
            ...options,
            headers: {
                ...options?.headers,
                'x-request-id': requestId$,
            }
        }

        switch (method) {
            case HttpMethod.GET:
                response = this.httpService.get(uri, options$)
                break
            case HttpMethod.POST:
                response = this.httpService.post(uri, data, options$)
                break
            case HttpMethod.PATCH:
                response = this.httpService.patch(uri, data, options$)
                break
            case HttpMethod.PUT:
                response = this.httpService.put(uri, data, options$)
                break
            case HttpMethod.DELETE:
                response = this.httpService.delete(uri, options$)
                break
            default:
                throw new InternalServerException(
                    `Unsupported HTTP Method: ${method}`,
                )
        }

        return lastValueFrom(
            response.pipe(
                map((response) => {
                    const T1 = Date.now()
                    Logger.warn(
                        {
                            message: response.config.method?.toUpperCase(),
                            route: response.config.url,
                            transport: 'REST',
                            requestId:
                                response.headers['x-request-id'] || requestId$,
                            timestamp: timestamp(T1),
                            params: response.config.params,
                            data: response.data,
                        },
                        LOGGER_CONTEXT
                    )

                    return response
                }),
                catchError((err) => {
                    const T1 = Date.now()
                    Logger.error(
                        {
                            message: method,
                            route,
                            transport: 'REST',
                            requestId: requestId$,
                            timestamp: timestamp(T1),
                            params,
                            error: err,
                        },
                        LOGGER_CONTEXT
                    )

                    return throwError(() => {
                        if (err instanceof BaseError) {
                            return err
                        } else if (err instanceof AxiosError) {
                            // TODO: fix it
                            return new BaseError(
                                ErrorCode.RUNTIME_ERROR,
                                err.message,
                                err,
                            )
                        }
                        return new BaseError(
                            ErrorCode.RUNTIME_ERROR,
                            err.message,
                            err,
                        )
                    })
                }),
            ),
        )
    }
}
