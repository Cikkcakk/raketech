import { isStringEnumValue } from '../utils/type.utils';

export enum ResponseStatus {
  SUCCESS= "SUCCESS",
  FAILURE = "FAILURE",
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  FORBIDDEN = 'FORBIDDEN',
  TIMEOUT = 'TIMEOUT',
}

export interface IError {
  message: string
}

export interface IApiResponsePayload {
  status?: ResponseStatus
  [x: string]: unknown
}

export interface IApiErrorResponse {
  status: ResponseStatus
  requestId?: string
  error: IError
}

export interface IApiDataResponse<T> {
  status: ResponseStatus
  requestId?: string
  data: T
}

export interface IApiResponse<T>
  extends Omit<IApiDataResponse<T> | IApiErrorResponse, 'error' | 'data'> {
  error?: IError
  data?: T
}

export const isSuccessfulApiResponse = <T>(
  value?: unknown,
): value is IApiDataResponse<T> => {
  if (value === undefined) {
    return false
  }
  const result = value as IApiDataResponse<T>
  return (
    result.data !== undefined &&
    result.status !== undefined &&
    isStringEnumValue(ResponseStatus, result.status) &&
    (result.status === ResponseStatus.SUCCESS ||
      result.status === ResponseStatus.CREATED ||
      result.status === ResponseStatus.UPDATED)
  )
}

export const isFailedApiResponse = <T>(
  value?: unknown,
): value is IApiDataResponse<T> => {
  if (value === undefined) {
    return false
  }
  const result = value as IApiErrorResponse
  return (
    result.error !== undefined &&
    result.status !== undefined &&
    isStringEnumValue(ResponseStatus, result.status) &&
    (result.status === ResponseStatus.FAILURE ||
      result.status === ResponseStatus.FORBIDDEN)
  )
}