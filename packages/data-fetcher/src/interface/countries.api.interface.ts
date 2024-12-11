export interface ILocalizedString {
  official: string
  common: string
}

export interface ILocalizedName extends ILocalizedString {
  nativeName: Record<string, ILocalizedString>
}

export interface ICurrency {
  name: string
  symbol: string
}

export interface IImage {
  png: string
  svg: string
}

export interface ICountry {
  name: ILocalizedName
  independent: boolean
  currencies: Record<string, ICurrency>
  capital: string
  region: string
  languages: Record<string, string>
  translations: Record<string, ILocalizedString>
  latlng: number[]
  area: number
  flag: string
  flags: IImage
}

