import { Controller, Get } from '@nestjs/common';
import { DataService } from '../services/data.service';
import { Pagination } from '../../../common/core/decorator/http.parameter.decorator';
import { IPaginatedRequest, IPaginatedResponse } from '../../../common/interface/pagination.interface';
import { IFlag } from '../../../common/interface/flag.interface';
import { DataWorker } from '../worker/data.worker';
import { ResponseStatus } from '../../../common/interface/response.interface';

@Controller()
export class RestController {
    constructor(private readonly appService: DataService, private readonly worker: DataWorker) {}

    @Get()
    async getPaginated(@Pagination({page: 0, pageSize: 20}) pagination: IPaginatedRequest): Promise<IPaginatedResponse<IFlag>> {
        return this.appService.get(pagination)
    }

    @Get('fetch')
    async fetchData() {
        const result = await this.worker.update()
        return { status: ResponseStatus.UPDATED, count: result.length}
    }
}
