import { Controller, Get, Headers, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InventoryService } from '../service/inventory.service';
import type { IElement } from 'src/core/entities/generic.entity';
import type { IInventory } from 'src/core/entities/inventory.entity';

@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Observable<IElement<IInventory>> {
    return this.service.getAll({ mId, key });
  }

  @Get(':id')
  getEmployeeById(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Param('id') id: string,
  ): Observable<IInventory> {
    return this.service.get({ mId, key, id });
  }
}
