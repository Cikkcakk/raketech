import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPaginatedRequest } from '../../interface/pagination.interface';

export const Pagination = createParamDecorator(
  (options: IPaginatedRequest, context: ExecutionContext): Promise<IPaginatedRequest> => {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const { page, pageSize } = req.query
    return Promise.resolve({
      page: page !== undefined ? parseInt(page) : options.page,
      pageSize: pageSize !== undefined ? parseInt(pageSize) : options.pageSize,
    })
  },
)