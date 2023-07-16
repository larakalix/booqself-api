import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import type { IEndpointProps } from 'src/core/dtos/endpoint';
import type { IEntity } from 'src/core/entities/generic';
import type { ILineItem } from 'src/core/entities/lineItem';
import type { IFormAppointment } from 'src/core/entities/appointment';

@Injectable()
export class LineItemService {
  async create(
    props: IEndpointProps & IEntity,
    appointment: IFormAppointment,
  ): Promise<ILineItem> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/orders/${props.id}/line_items`;

    try {
      const { data } = await axios.post<ILineItem>(
        url,
        {
          name: appointment.service.name,
          alternateName: appointment.service.name,
          price: parseInt(
            appointment.service.price.replace(',', '').replace('.', ''),
          ),
          unitQty: 1,
          isRevenue: true,
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
