import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CustomerMembershipController } from './controller/customer-membership.controller';
import { CustomerMembershipService } from './service/customer-membership.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CustomerMembershipController],
  providers: [CustomerMembershipService, ConfigService],
})
export class CustomerMembershipModule {}
