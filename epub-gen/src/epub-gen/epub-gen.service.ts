import { Injectable, Logger, StreamableFile } from '@nestjs/common'
import epub from 'epub-gen-memory'

import { CreateEpubGenDto } from './dto/create-epub-gen.dto'

@Injectable()
export class EpubGenService {
  private readonly logger = new Logger(EpubGenService.name)

  async create(createEpubGenDto: CreateEpubGenDto) {
    this.logger.log(`Generating epub for: ${createEpubGenDto.title}`)

    console.log(createEpubGenDto)

    const { title, chapters } = createEpubGenDto
    const res = await epub({ title }, chapters)

    return new StreamableFile(res)
  }
}
