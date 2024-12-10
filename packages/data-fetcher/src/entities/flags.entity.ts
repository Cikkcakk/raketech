import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Constants } from '../constants';
import { TranslationEntity } from './translations.entity';
import { IFlag } from '../../../common/interface/flag.interface';

@Entity({ name: 'flags' })
// @Unique('official_name_index', ['official_name']) // for the upsert
export class FlagEntity implements IFlag {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ name: 'official_name', type: 'varchar', length: Constants.sql.field.length.country_name, nullable: false, unique: true})
    officialName: string

    @Column({ name: 'common_name', type: 'varchar', length: Constants.sql.field.length.country_name, nullable: true, default: null })
    commonName: string | null

    @Column({ name: 'flag_svg', type: 'varchar', length: Constants.sql.field.length.url, nullable: true, default: null })
    flagSVG: string | null

    @Column({ name: 'flag_utf', type: 'varchar', length: Constants.sql.field.length.flag, nullable: true, default: null })
    flagUTF: string | null

    @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

    @OneToMany(() => TranslationEntity, translation => translation.flag)
    @JoinColumn()
    translations: TranslationEntity[]
}
