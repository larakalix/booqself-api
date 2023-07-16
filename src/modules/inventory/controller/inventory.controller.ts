import { Controller, Get, Headers, Param } from '@nestjs/common';
import { InventoryService } from '../service/inventory.service';
import type { IElement } from 'src/core/entities/generic';
import type { IInventory } from 'src/core/entities/inventory';

@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Promise<IElement<IInventory>> {
    return this.service.getAll({ mId, key });
  }

  @Get(':id')
  getEmployeeById(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Param('id') id: string,
  ): Promise<IInventory> {
    return this.service.get({ mId, key, id });
  }
}
