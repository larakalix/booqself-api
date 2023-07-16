import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LineItemService } from './service/line-item.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [LineItemService, ConfigService],
})
export class LineItemModule {}
