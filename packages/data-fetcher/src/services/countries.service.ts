import { HttpMethod, RestAPIService } from './rest.service';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Constants } from '../constants';
import { ICountry } from '../interface/countries.api.interface';

@Injectable()
export class CountriesService {
  private readonly countriesService: RestAPIService
  constructor(private readonly httpService: HttpService) {
    this.countriesService = new RestAPIService(Constants.service.countries.baseUrl, httpService)
  }

  async fetchAll(): Promise<ICountry[]> {
    const countries = await this.countriesService.request<ICountry[]>(HttpMethod.GET, 'all')
    // console.log('RESPONSE:', countries)
    return countries.data
  }
}