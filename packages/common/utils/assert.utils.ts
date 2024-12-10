import { InternalServerException } from '../error/internal.server.exception';

export function assertIsDefined<T>(
  name: string,
  value?: T,
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new InternalServerException(
      `${name} can not be null or undefined`,
    )
  }
}
