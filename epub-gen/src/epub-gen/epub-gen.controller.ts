import { Controller, Post, Body, Header } from '@nestjs/common'

import { EpubGenService } from './epub-gen.service'
import { CreateEpubGenDto } from './dto/create-epub-gen.dto'

@Controller('epub-gen')
export class EpubGenController {
  constructor(private readonly epubGenService: EpubGenService) {}

  @Post()
  @Header('Content-Type', 'application/zip')
  async create(@Body() createEpubGenDto: CreateEpubGenDto) {
    return this.epubGenService.create(createEpubGenDto)
  }
}
