import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const updateTranslationSchema = z.object({
  languageCode: z.string(),
  officialValue: z.string().optional(),
  commonValue: z.string().optional()
})

export class UpdateTranslationDto extends createZodDto(updateTranslationSchema) {}