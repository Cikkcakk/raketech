import { Injectable } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';
import { DataService } from '../services/data.service';
import { validate } from 'nestjs-zod';
import { UpdateFlagDto } from '../dto/update.flag.dto';
import { ObjectLiteral } from 'typeorm';

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
      }, UpdateFlagDto, (zodError) => new Error(`Validation Failed ${zodError.stack}`))

      const result = await this.appService.update(country.name.official, dto)
      // console.log(`+ ${country.name.official}`, result.identifiers)
      updates.push(result.identifiers)
    }

    return updates
  }
}