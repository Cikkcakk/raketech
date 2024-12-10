import { IFlag } from '../interface/flag.interface';
import { IPaginatedRequest, IPaginatedResponse } from '../interface/pagination.interface';

export interface GetFlagsMessage extends IPaginatedRequest {
  // TODO: other metadata
}

export interface GetFlagsReply extends IPaginatedResponse<IFlag> {
  // TODO: other metadata
}