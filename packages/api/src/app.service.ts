import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetFlagsMessage, GetFlagsReply } from '../../common/messages/get.flags.message';
import { IPaginatedRequest } from '../../common/interface/pagination.interface';

@Injectable()
export class AppService {
    constructor(@Inject('FLAG_SERVICE') private readonly client: ClientProxy) {}
    async get(pagination: IPaginatedRequest): Promise<GetFlagsReply> {
        return new Promise<GetFlagsReply>((resolve, reject) => {
            const payload: GetFlagsMessage = {
                ...pagination
                // TODO: ... metadata ...
            }
            const observable = this.client.send<GetFlagsReply, GetFlagsMessage>('get', payload)
            observable.subscribe({
                next: (reply) => {
                    resolve(reply)
                },
                error: (err) => {
                    reject(err)
                }
            })
        })
    }
}
