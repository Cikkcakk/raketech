import { Module } from '@nestjs/common';
import { FetchCommand } from './fetch.command';
import { TypeOrmFlagsModule } from '../typeorm/typeorm.flags.module';
import { COUNTRY_FLAGS } from '../typeorm/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlagEntity } from '../entities/flags.entity';
import { TranslationEntity } from '../entities/translations.entity';
import { DataService } from '../services/data.service';
import { HttpModule } from '@nestjs/axios';
import { CountriesService } from '../services/countries.service';
import { DataWorker } from '../worker/data.worker';

@Module({
  imports: [
    TypeOrmFlagsModule,
    TypeOrmModule.forFeature([FlagEntity, TranslationEntity], COUNTRY_FLAGS),
    HttpModule
  ],
  providers: [FetchCommand, DataService, CountriesService, DataWorker],
})
export class FetchModule {}