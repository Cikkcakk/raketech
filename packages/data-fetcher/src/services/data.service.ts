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
import { UpdateTranslationDto } from '../dto/update.translation.dto';

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

    async update(officialName: string, dto: UpdateFlagDto, translations: UpdateTranslationDto[]): Promise<InsertResult> {
        // const newFlag = this.flagsRepository.insert()
        // const newTranslations = translations.map((t) => this.translationRepository.in)
        // return this.flagsRepository.upsert({ ...dto, officialName, updatedAt: new Date()}, ['officialName'])

        const result = await this.flagsRepository
          .createQueryBuilder()
          .insert()
          .into(FlagEntity)
          .values({ ...dto, officialName, updatedAt: new Date() })
          .orUpdate(['common_name', 'flag_svg', 'flag_utf', 'updated_at'],['official_name'])
          .execute()

        const xxx = await Promise.all(translations.map((t) => {
            return this.translationRepository
              .createQueryBuilder()
              .insert()
              .into(TranslationEntity)
              .values({ ...t, flagId: result.identifiers[0].id})
              .orUpdate(['common_value', 'official_value'],['language_code', 'flag_id'])
              .execute()
        }))

        return result
    }

    async get(request: IPaginatedRequest): Promise<IPaginatedResponse<IFlag>> {
        const [data, total] = await this.flagsRepository.findAndCount({ skip: request.page, take: request.pageSize, relations: { translations: true }})
        return {
            ...request,
            total: total,
            count: data.length,
            data
        }
    }
}
