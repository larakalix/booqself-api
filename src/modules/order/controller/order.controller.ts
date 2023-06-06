import { Controller, Get, Headers, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrderService } from '../service/order.service';
import type { IElement } from 'src/core/entities/generic.entity';
import type { IOrder } from 'src/core/entities/order.entity';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Observable<IElement<IOrder>> {
    return this.service.getAll({ mId, key });
  }

  @Get(':id')
  getEmployeeById(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Param('id') id: string,
  ): Observable<IOrder> {
    return this.service.get({ mId, key, id });
  }
}
