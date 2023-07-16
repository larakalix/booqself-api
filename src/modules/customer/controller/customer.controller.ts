import { Controller, Get, Headers, Param } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import type { IElement } from 'src/core/entities/generic';
import type { ICustomer } from 'src/core/entities/customer';

@Controller('api/customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Promise<IElement<ICustomer>> {
    return this.service.getAll({ mId, key });
  }

  @Get(':id')
  getEmployeeById(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Param('id') id: string,
  ): Promise<ICustomer> {
    return this.service.get({ mId, key, id });
  }
}
