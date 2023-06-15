import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MembershipController } from './controller/membership.controller';
import { MembershipService } from './service/membership.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [MembershipController],
  providers: [MembershipService, ConfigService],
})
export class CustomerModule {}
