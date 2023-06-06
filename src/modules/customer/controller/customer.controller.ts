import { Controller, Get, Headers, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomerService } from '../service/customer.service';
import type { IElement } from 'src/core/entities/generic.entity';
import type { ICustomer } from 'src/core/entities/customer.entity';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Observable<IElement<ICustomer>> {
    return this.service.getAll({ mId, key });
  }

  @Get(':id')
  getEmployeeById(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Param('id') id: string,
  ): Observable<ICustomer> {
    return this.service.get({ mId, key, id });
  }
}
