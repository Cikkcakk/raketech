import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Pagination } from '../../common/core/decorator/http.parameter.decorator';
import { IPaginatedRequest } from '../../common/interface/pagination.interface';
import { GetFlagsReply } from '../../common/messages/get.flags.message';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getHello(@Pagination() params: IPaginatedRequest): Promise<GetFlagsReply> {
        return this.appService.get(params)
    }
}
