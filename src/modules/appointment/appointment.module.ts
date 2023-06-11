import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppointmentService } from './service/appointment.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [AppointmentService, ConfigService],
})
export class AppointmentModule {}
