import { Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import type { IEmployee } from 'src/core/entities/employee.entity';
import type { IEmployeeProps } from '../types/employee.type';
import type { IEntity } from 'src/core/entities/generic.entity';

@Injectable()
export class EmployeeService {
  constructor(private readonly httpService: HttpService) {}

  private getBaseUrl(): string {
    return process.env.CLOVER_API_URL;
  }

  private handleError(error: AxiosError): Observable<never> {
    if (error.response) {
      const { data, status } = error.response;
      console.log(data, status);
      return throwError(
        `Request failed with status ${status}: ${JSON.stringify(data)}`,
      );
    } else {
      return throwError('Request failed');
    }
  }

  getAllEmployees(props: IEmployeeProps): Observable<IEmployee[]> {
    const baseUrl = this.getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/employees`;

    return this.httpService
      .get<IEmployee[]>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IEmployee[]>) => response.data),
        catchError((error: AxiosError) => this.handleError(error)),
      );
  }

  getEmployeeById(props: IEmployeeProps & IEntity): Observable<IEmployee> {
    const baseUrl = this.getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/employees/${props.id}`;

    return this.httpService
      .get<IEmployee>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IEmployee>) => response.data),
        catchError((error: AxiosError) => this.handleError(error)),
      );
  }
}
