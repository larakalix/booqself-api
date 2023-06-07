import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import { IReadableService } from 'src/core/abstracts/generic-repo.abstract';
import type { IEndpointProps } from 'src/core/dtos/endpoint.props';
import type { IElement, IEntity } from 'src/core/entities/generic.entity';
import type { ICustomer } from 'src/core/entities/customer.entity';

@Injectable()
export class CustomerService implements IReadableService<ICustomer> {
  constructor(private readonly httpService: HttpService) {}

  getAll(props: IEndpointProps): Observable<IElement<ICustomer>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/customers?expand=emailAddresses%2CphoneNumbers`;

    return this.httpService
      .get<IElement<ICustomer>>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IElement<ICustomer>>) => response.data),
        map((data: IElement<ICustomer>) => ({
          ...data,
          elements: data.elements.map((element: ICustomer) => ({
            ...element,
            emailAddressesList: element.emailAddresses.elements,
            phoneNumbersList: element.phoneNumbers.elements,
          })),
        })),
        catchError((error: AxiosError) => handleError(error)),
      );
  }

  get(props: IEndpointProps & IEntity): Observable<ICustomer> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/customers/${props.id}`;

    return this.httpService
      .get<ICustomer>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<ICustomer>) => response.data),
        catchError((error: AxiosError) => handleError(error)),
      );
  }
}
