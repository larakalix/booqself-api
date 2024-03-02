import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import { digitFormatter } from 'src/core/helper/formatters.helper';
import { IReadableService } from 'src/core/abstracts/generic-repo.abstract';
import type { IEndpointProps } from 'src/core/dtos/endpoint';
import type { IElement, IEntity } from 'src/core/entities/generic';
import type { IOrder } from 'src/core/entities/order';
import type { IAppointment } from 'src/core/entities/appointment';

@Injectable()
export class OrderService implements IReadableService<IOrder> {
  async getAll(props: IEndpointProps): Promise<IElement<IOrder>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/orders?expand=lineItems`;

    try {
      const { data } = await axios.get<IElement<IOrder>>(url, {
        headers: { Authorization: props.key },
      });

      const transformedData: IElement<IOrder> = {
        ...data,
        elements: data.elements.map((element: IOrder) => ({
          ...element,
          parsedTotal: digitFormatter.format(element.total / 100),
          itemList: element.lineItems.elements.map((lineItem) => ({
            ...lineItem,
            parsedPrice: digitFormatter.format(lineItem.price / 100),
          })),
        })),
      };

      return transformedData;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }

  async get(props: IEndpointProps & IEntity): Promise<IOrder> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/orders/${props.id}`;

    try {
      const { data } = await axios.get<IOrder>(url, {
        headers: { Authorization: props.key },
      });

      return data;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }

  async create(
    props: IEndpointProps,
    appointment: IAppointment,
  ): Promise<IOrder> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/orders`;

    try {
      const { data } = await axios.post<IOrder>(
        url,
        {
          employee: { id: appointment.employee.cloverId },
          total: appointment.service.price,
          paymentState: 'OPEN',
          title: appointment.service.name,
          state: 'open',
          manualTransaction: true,
          groupLineItems: true,
          payType: 'FULL',
        },
        {
          headers: { Authorization: props.key },
        },
      );

      return data;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }
}
