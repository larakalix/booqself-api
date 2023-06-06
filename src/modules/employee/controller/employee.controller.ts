import { Controller, Get, Headers, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployeeService } from '../service/employee.service';
import type { IElement } from 'src/core/entities/generic.entity';
import type { IEmployee } from 'src/core/entities/employee.entity';

@Controller('api/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAllEmployees(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
  ): Observable<IElement<IEmployee>> {
    return this.employeeService.getAll({ mId, key });
  }

  @Get(':id')
  getEmployeeById(
    @Headers('merchantid') mId: string,
    @Headers('authorization') key: string,
    @Param('id') id: string,
  ): Observable<IEmployee> {
    return this.employeeService.get({ mId, key, id });
  }
}
