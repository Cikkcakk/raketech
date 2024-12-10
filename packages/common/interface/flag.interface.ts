import { ITranslation } from './translation.interface';

export interface IFlag {
  id: number
  officialName: string
  commonName: string | null
  flagUTF: string | null
  flagSVG: string | null
  updatedAt: Date
  translations: ITranslation[]
}