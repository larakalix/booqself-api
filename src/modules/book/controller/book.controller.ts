import { Controller, Get, Headers, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookService } from '../service/book.service';
import type { IBook } from 'src/core/entities/book.entity';

@Controller('api/book')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Query('justTenant') justTenant: boolean,
    @Query('appointmentId') appointmentId?: string,
  ): Observable<IBook> {
    return this.service.getAll({ mId, key }, justTenant, appointmentId);
  }
}
