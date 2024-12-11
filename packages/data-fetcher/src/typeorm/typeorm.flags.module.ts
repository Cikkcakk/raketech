import { TypeOrmModule } from '@nestjs/typeorm';
import { options as typeormConfig } from '../../typeorm.config';
import { DataSource } from 'typeorm';
import { assertIsDefined } from '../../../common/utils/assert.utils';
import { FlagEntity } from '../entities/flags.entity';
import { TranslationEntity } from '../entities/translations.entity';

import { COUNTRY_FLAGS } from './constants';

const LOGGER_CONTEXT = 'typeorm.flags.module'
export const TypeOrmFlagsModule = TypeOrmModule.forRootAsync({
    name: COUNTRY_FLAGS,
    // imports: [],
    useFactory: () => {
        // Logger.log(typeormConfig, LOGGER_CONTEXT)
        return {
            ...typeormConfig,
            entities: [FlagEntity, TranslationEntity],
            migrationsRun: true,
            synchronize: true,
            logging: true,
            autoLoadEntities: true
        }
    },
    dataSourceFactory: async (options) => {
        assertIsDefined('Read DataSource Options', options)
        return await new DataSource(options).initialize()
    },
})
