import { JSONValue } from '../interface/json.types';

export interface IError {
  name: string
  message: string
}

export class BaseError extends Error {
  readonly code: number
  readonly error?: Error | JSONValue | null
  /**
   *
   * @param code
   * @param message
   * @param error
   */
  constructor(
    code: number,
    message: string,
    error: Error | JSONValue | null = null,
  ) {
    super(message)
    this.code = code
    this.error = error
  }
}

export const isSatisfiesError = (value: unknown): value is IError => {
  const error = value as IError
  return error.name !== undefined && error.message !== undefined
}

export const isError = (value: unknown): value is BaseError => {
  const err = value as BaseError
  return (
    err.code !== undefined &&
    typeof err.code !== 'function' &&
    err.message !== undefined &&
    typeof err.message !== 'function'
  )
}
