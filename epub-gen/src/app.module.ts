import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpubGenModule } from './epub-gen/epub-gen.module';

@Module({
  imports: [EpubGenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
