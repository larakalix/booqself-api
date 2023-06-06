import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [OrderController],
  providers: [OrderService, ConfigService],
})
export class OrderModule {}
