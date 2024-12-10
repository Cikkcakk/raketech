import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const createFlagSchema = z.object({
  officialName: z.string(),
  commonName: z.string().optional(),
  flagSVG: z.string().optional(),
  flagUTF: z.string().optional(),
})

export class CreateFlagDto extends createZodDto(createFlagSchema) {}