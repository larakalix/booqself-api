import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import { IReadableService } from 'src/core/abstracts/generic-repo.abstract';
import { digitFormatter } from 'src/core/helper/formatters.helper';
import type { IEndpointProps } from 'src/core/dtos/endpoint.props';
import type { IElement, IEntity } from 'src/core/entities/generic.entity';
import type { IInventory } from 'src/core/entities/inventory.entity';

@Injectable()
export class InventoryService implements IReadableService<IInventory> {
  constructor(private readonly httpService: HttpService) {}

  getAll(props: IEndpointProps): Observable<IElement<IInventory>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/items`;

    return this.httpService
      .get<IElement<IInventory>>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IElement<IInventory>>) => response.data),
        map((data: IElement<IInventory>) => ({
          ...data,
          elements: data.elements.map((element: IInventory) => ({
            ...element,
            parsedPrice: digitFormatter.format(element.price / 100),
          })),
        })),
        catchError((error: AxiosError) => handleError(error)),
      );
  }

  get(props: IEndpointProps & IEntity): Observable<IInventory> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/items/${props.id}`;

    return this.httpService
      .get<IInventory>(url, {
        headers: {
          Authorization: props.key,
        },
      })
      .pipe(
        map((response: AxiosResponse<IInventory>) => response.data),
        catchError((error: AxiosError) => handleError(error)),
      );
  }
}
