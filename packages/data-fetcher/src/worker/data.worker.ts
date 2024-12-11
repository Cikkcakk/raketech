import { Injectable } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { DataService } from '../services/data.service';
import { validate } from 'nestjs-zod';
import { UpdateFlagDto } from '../dto/update.flag.dto';
import { UpdateTranslationDto } from '../dto/update.translation.dto';

export interface IFlagUpdateResult {
  flagsUpdated: number[]
  translationsUpdated: number[]
}

@Injectable()
export class DataWorker {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly appService: DataService) {}

  async update(): Promise<IFlagUpdateResult>{
    const countries = await this.countriesService.fetchAll()
    const flagsUpdated: number[] = []
    const translationsUpdated: number[] = []

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

      const [flagsResult, translationsResult] = await this.appService.update(country.name.official, dto, translations)
      // console.log(`+ ${country.name.official}`, result.identifiers)
      flagsUpdated.push(flagsResult.identifiers[0].id)
      translationsUpdated.push( ...translationsResult.map((tr) => tr.identifiers[0].id) )
    }

    return {
      flagsUpdated,
      translationsUpdated
    }
  }
}