import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import { IReadableService } from 'src/core/abstracts/generic-repo.abstract';
import type { IEndpointProps } from 'src/core/dtos/endpoint.props';
import type { IElement, IEntity } from 'src/core/entities/generic.entity';
import type { IOrder } from 'src/core/entities/order.entity';
import { digitFormatter } from 'src/core/helper/formatters.helper';

@Injectable()
export class OrderService implements IReadableService<IOrder> {
  constructor(private readonly httpService: HttpService) {}

  getAll(props: IEndpointProps): Observable<IElement<IOrder>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/orders?expand=lineItems`;

    return this.httpService
      .get<IElement<IOrder>>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IElement<IOrder>>) => response.data),
        map((data: IElement<IOrder>) => ({
          ...data,
          elements: data.elements.map((element: IOrder) => ({
            ...element,
            parsedTotal: digitFormatter.format(element.total / 100),
            itemList: element.lineItems.elements.map((lineItem) => ({
              ...lineItem,
              parsedPrice: digitFormatter.format(lineItem.price / 100),
            })),
          })),
        })),
        catchError((error: AxiosError) => handleError(error)),
      );
  }

  get(props: IEndpointProps & IEntity): Observable<IOrder> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/orders/${props.id}`;

    return this.httpService
      .get<IOrder>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IOrder>) => response.data),
        catchError((error: AxiosError) => handleError(error)),
      );
  }
}
