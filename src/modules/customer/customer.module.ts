import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './service/customer.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CustomerController],
  providers: [CustomerService, ConfigService],
})
export class CustomerModule {}
