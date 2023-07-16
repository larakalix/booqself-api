import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomerMembershipService } from '../service/customer-membership.service';
import type { ICustomerMembership } from 'src/core/entities/customer-membership';

@Controller('api/customers-memberships')
export class CustomerMembershipController {
  constructor(private readonly service: CustomerMembershipService) {}

  // @Get()
  // getAllEmployees(
  //   @Headers('merchantid') mId: string,
  //   @Headers('authorization') key: string,
  // ): Observable<IElement<ICustomer>> {
  //   return this.service.getAll({ mId, key });
  // }

  // @Get(':id')
  // getEmployeeById(
  //   @Headers('merchantid') mId: string,
  //   @Headers('authorization') key: string,
  //   @Param('id') id: string,
  // ): Observable<ICustomer> {
  //   return this.service.get({ mId, key, id });
  // }

  @Post()
  create(
    @Body() customerMembership: ICustomerMembership,
  ): Observable<ICustomerMembership> {
    return this.service.get({ customerMembership });
  }
}
