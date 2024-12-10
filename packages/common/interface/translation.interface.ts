import { IFlag } from './flag.interface';

export interface ITranslation {
  id: number
  languageCode: string
  officialValue: string
  commonValue: string | null
  flagId: number
  flag: IFlag
}