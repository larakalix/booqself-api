import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import { IReadableService } from 'src/core/abstracts/generic-repo.abstract';
import type { IEndpointProps } from 'src/core/dtos/endpoint.props';
import type { IElement, IEntity } from 'src/core/entities/generic.entity';
import type { IEmployee } from 'src/core/entities/employee.entity';

@Injectable()
export class EmployeeService implements IReadableService<IEmployee> {
  constructor(private readonly httpService: HttpService) {}

  getAll(props: IEndpointProps): Observable<IElement<IEmployee>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/employees`;

    return this.httpService
      .get<IElement<IEmployee>>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IElement<IEmployee>>) => response.data),
        catchError((error: AxiosError) => handleError(error)),
      );
  }

  get(props: IEndpointProps & IEntity): Observable<IEmployee> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/employees/${props.id}`;

    return this.httpService
      .get<IEmployee>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IEmployee>) => response.data),
        catchError((error: AxiosError) => handleError(error)),
      );
  }
}
