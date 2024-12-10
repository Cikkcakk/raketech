import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const updateFlagSchema = z.object({
  commonName: z.string().optional(),
  flagSVG: z.string().optional(),
  flagUTF: z.string().optional(),
})

export class UpdateFlagDto extends createZodDto(updateFlagSchema) {}