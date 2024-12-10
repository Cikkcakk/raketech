import { Module } from '@nestjs/common';
import { DataService } from '../services/data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmFlagsModule } from '../typeorm/typeorm.flags.module';
import { FlagEntity } from '../entities/flags.entity';
import { TranslationEntity } from '../entities/translations.entity';
import { HttpModule } from '@nestjs/axios';
import { RestController } from './rest.controller';
import { DataWorker } from '../worker/data.worker';
import { CountriesService } from '../services/countries.service';

@Module({
    imports: [
        TypeOrmFlagsModule,
        TypeOrmModule.forFeature([FlagEntity, TranslationEntity], 'COUNTRY_FLAGS'),
        HttpModule
    ],
    controllers: [RestController],
    providers: [DataService, CountriesService, DataWorker]
})
export class RestModule {}
