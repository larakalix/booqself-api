import { Controller, Get, Headers } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MembershipService } from '../service/membership.service';
import type { IDatable } from 'src/core/entities/generic.entity';
import type { IMembership } from 'src/core/entities/membership.entity';

@Controller('api/customers')
export class MembershipController {
  constructor(private readonly service: MembershipService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Observable<IDatable<IMembership>> {
    return this.service.getAll({ mId, key });
  }
}
