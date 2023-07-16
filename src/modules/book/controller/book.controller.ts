import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { BookService } from '../service/book.service';
import type { IBook } from 'src/core/entities/book';
import type { IDatable } from 'src/core/entities/generic';
import type { IFormAppointment } from 'src/core/entities/appointment';

@Controller('api/book')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Get()
  getBookBoilerplate(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Query('justTenant') justTenant: boolean,
    @Query('appointmentId') appointmentId?: string,
  ): Promise<IBook> {
    return this.service.getBookBoilerplate(
      { mId, key },
      justTenant,
      appointmentId,
    );
  }

  @Post()
  bookAppointment(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Body() appointment: IFormAppointment,
  ): Promise<IDatable<IFormAppointment>> {
    return this.service.bookAppointment({ mId, key }, { appointment });
  }
}
