import { Type } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator'

export class Chapter {
  @IsOptional()
  title?: string

  @IsNotEmpty()
  content: string

  //NOT SUPPORTED
  // author?: string | string[]

  //NOT SUPPORTED
  // excludeFromToc?: boolean

  //NOT SUPPORTED
  // beforeToc?: boolean
}

export class CreateEpubGenDto {
  @IsNotEmpty()
  title: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Chapter)
  chapters: Chapter[]
}
