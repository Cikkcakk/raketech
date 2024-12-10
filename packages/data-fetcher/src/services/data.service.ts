import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlagEntity } from '../entities/flags.entity';
import { InsertResult, Repository } from 'typeorm';
import { TranslationEntity } from '../entities/translations.entity';
import { COUNTRY_FLAGS } from '../typeorm/constants';
import { CreateFlagDto } from '../dto/create.flag.dto';
import { UpdateFlagDto } from '../dto/update.flag.dto';
import { IFlag } from '../../../common/interface/flag.interface';
import { IPaginatedRequest, IPaginatedResponse } from '../../../common/interface/pagination.interface';

@Injectable()
export class DataService {
    constructor(
      @InjectRepository(FlagEntity, COUNTRY_FLAGS) private readonly flagsRepository: Repository<FlagEntity>,
      @InjectRepository(TranslationEntity, COUNTRY_FLAGS) private readonly translationRepository: Repository<TranslationEntity>
    ) {}

    async create(dto: CreateFlagDto): Promise<FlagEntity> {
        const newFlag= this.flagsRepository.create(dto)
        return this.flagsRepository.save(newFlag)
    }

    async update(officialName: string, dto: UpdateFlagDto): Promise<InsertResult> {
        return this.flagsRepository.upsert({ ...dto, officialName, updatedAt: new Date()}, ['officialName'])
    }

    async get(request: IPaginatedRequest): Promise<IPaginatedResponse<IFlag>> {
        const [data, total] = await this.flagsRepository.findAndCount({ skip: request.page, take: request.pageSize})
        return {
            ...request,
            total: total,
            count: data.length,
            data
        }
    }
}
