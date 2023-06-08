import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { InventoryService } from '../inventory/service/inventory.service';
import { EmployeeService } from '../employee/service/employee.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [BookController],
  providers: [BookService, InventoryService, EmployeeService, ConfigService],
})
export class BookModule {}
