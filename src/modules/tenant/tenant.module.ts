import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TenantService } from './service/tenant.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [TenantService, ConfigService],
})
export class TenantModule {}
