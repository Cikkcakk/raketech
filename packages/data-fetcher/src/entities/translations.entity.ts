import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FlagEntity } from './flags.entity';
import { Constants } from '../constants';

@Entity('translations')
export class TranslationEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ name: 'language_code', type: 'varchar', length: Constants.sql.field.length.languageCode, nullable: false })
    languageCode: string

    @Column({ name: 'official_value', type: 'varchar', length: Constants.sql.field.length.country_name, nullable: false })
    officialValue: string

    @Column({ name: 'common_value', type: 'varchar', length: Constants.sql.field.length.country_name, nullable: true, default: null })
    commonValue: string | null

    @Column({ type: 'int' })
    flagId: number

    @ManyToOne(() => FlagEntity, flag => flag.translations)
    @JoinColumn({ name: 'flagId ' })
    flag: FlagEntity
}
