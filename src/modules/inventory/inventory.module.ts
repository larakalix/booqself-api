import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { InventoryController } from './controller/inventory.controller';
import { InventoryService } from './service/inventory.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [InventoryController],
  providers: [InventoryService, ConfigService],
})
export class InventoryModule {}
