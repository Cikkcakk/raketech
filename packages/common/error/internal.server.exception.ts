import { BaseError } from './base.error';
import { ErrorCode } from './error.code';

export class InternalServerException extends BaseError {
  constructor(message: string) {
    super(ErrorCode.RUNTIME_ERROR, message)
    this.name = 'Internal server exception'
  }
}
