import { Injectable } from '@nestjs/common';
import { Observable, map, combineLatest } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { EmployeeService } from 'src/modules/employee/service/employee.service';
import { InventoryService } from 'src/modules/inventory/service/inventory.service';
import { appendQueryParams } from 'src/core/helper/url.helper';
import type { IEndpointProps } from 'src/core/dtos/endpoint.props';
import type {
  IBook,
  IObservableBook,
  ITenant,
} from 'src/core/entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly inventoryService: InventoryService,
    private readonly employeeService: EmployeeService,
  ) {}

  getAll(props: IEndpointProps, justTenant?: boolean): Observable<IBook> {
    const url = appendQueryParams(
      `${process.env.STRAPI_URL}/custom-tenant/${props.mId}`,
      { justTenant },
    );

    const observableBook: IObservableBook = {
      tenant: this.httpService
        .get<ITenant>(url)
        .pipe(map((response: AxiosResponse<ITenant>) => response.data)),
      employees: this.employeeService.getAll({
        mId: props.mId,
        key: props.key,
      }),
      services: this.inventoryService.getAll({
        mId: props.mId,
        key: props.key,
      }),
    };

    const combinedObservable = combineLatest([
      observableBook.tenant,
      observableBook.services,
      observableBook.employees,
    ]).pipe(
      map(([tenant, services, employees]) => ({
        tenant,
        services,
        employees,
      })),
    );

    return combinedObservable.pipe(
      map((data) => ({
        ...data,
        tenant: { ...data.tenant },
      })),
    );
  }
}
