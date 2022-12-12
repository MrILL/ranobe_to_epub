import { Module } from '@nestjs/common'
import { EpubGenService } from './epub-gen.service'
import { EpubGenController } from './epub-gen.controller'

@Module({
  controllers: [EpubGenController],
  providers: [EpubGenService],
})
export class EpubGenModule {}
