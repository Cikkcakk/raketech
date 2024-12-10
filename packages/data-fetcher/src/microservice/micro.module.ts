import { Module } from '@nestjs/common';
import { TypeOrmFlagsModule } from '../typeorm/typeorm.flags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlagEntity } from '../entities/flags.entity';
import { TranslationEntity } from '../entities/translations.entity';
import { HttpModule } from '@nestjs/axios';
import { DataService } from '../services/data.service';
import { MicroController } from './micro.controller';

@Module({
  imports: [
    TypeOrmFlagsModule,
    TypeOrmModule.forFeature([FlagEntity, TranslationEntity], 'COUNTRY_FLAGS'),
    HttpModule
  ],
  controllers: [MicroController],
  providers: [DataService]
})
export class MicroModule {}