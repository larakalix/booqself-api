import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import type { IElement } from 'src/core/entities/generic';
import type { IOrder } from 'src/core/entities/order';
import type { IAppointment } from 'src/core/entities/appointment';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Promise<IElement<IOrder>> {
    return this.service.getAll({ mId, key });
  }

  @Get(':id')
  getEmployeeById(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Param('id') id: string,
  ): Promise<IOrder> {
    return this.service.get({ mId, key, id });
  }

  @Post()
  create(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Body() appointment: IAppointment,
  ): Promise<IOrder> {
    return this.service.create({ mId, key }, appointment);
  }
}
