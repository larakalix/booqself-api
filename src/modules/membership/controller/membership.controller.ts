import { Controller, Get, Headers } from '@nestjs/common';
import { MembershipService } from '../service/membership.service';
import type { IDatable } from 'src/core/entities/generic';
import type { IMembership } from 'src/core/entities/membership';

@Controller('api/memberships')
export class MembershipController {
  constructor(private readonly service: MembershipService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Promise<IDatable<IMembership>> {
    return this.service.getAll({ mId, key });
  }
}
