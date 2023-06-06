import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './service/employee.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, ConfigService],
})
export class EmployeeModule {}
