import { Injectable } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { DataService } from '../services/data.service';
import { validate } from 'nestjs-zod';
import { UpdateFlagDto } from '../dto/update.flag.dto';
import { ObjectLiteral } from 'typeorm';
import { UpdateTranslationDto } from '../dto/update.translation.dto';

@Injectable()
export class DataWorker {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly appService: DataService) {}

  async update(): Promise<ObjectLiteral[]>{
    const countries = await this.countriesService.fetchAll()
    const updates: ObjectLiteral[] = []

    for (const country of countries) {
      const dto = validate<UpdateFlagDto>({
        commonName: country.name.common,
        flagSVG: country.flags.svg,
        flagUTF: country.flag
      }, UpdateFlagDto, (zodError) => new Error(`Validation failed ${zodError.stack}`))

      const translations = Object.keys(country.translations).map((k) => {
        const t = country.translations[k]

        return validate<UpdateTranslationDto>({
          languageCode: k,
          officialValue: t.official,
          commonValue: t.common,
        }, UpdateTranslationDto, (zodError) => new Error(`Validation failed ${zodError.stack}`))
      })

      const result = await this.appService.update(country.name.official, dto, translations)
      // console.log(`+ ${country.name.official}`, result.identifiers)
      updates.push(result.identifiers)
    }

    return updates
  }
}