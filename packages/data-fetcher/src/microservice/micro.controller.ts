import { Controller } from '@nestjs/common';
import { DataService } from '../services/data.service';
import { Ctx, MessagePattern, Payload, TcpContext } from '@nestjs/microservices';
import { GetFlagsMessage, GetFlagsReply } from '../../../common/messages/get.flags.message';

@Controller()
export class MicroController {
    constructor(private readonly dataService: DataService) {}

    @MessagePattern('get')
    getPaginated(
      @Payload() params: GetFlagsMessage,
      @Ctx() context: TcpContext
    ): Promise<GetFlagsReply> {
        const { language, ...pagination} = params
        return this.dataService.get(pagination, language)
    }
}
