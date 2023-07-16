import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import { digitFormatter } from 'src/core/helper/formatters.helper';
import { IReadableService } from 'src/core/abstracts/generic-repo.abstract';
import type { IEndpointProps } from 'src/core/dtos/endpoint';
import type { IElement, IEntity } from 'src/core/entities/generic';
import type { IInventory } from 'src/core/entities/inventory';

@Injectable()
export class InventoryService implements IReadableService<IInventory> {
  async getAll(props: IEndpointProps): Promise<IElement<IInventory>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/items`;

    try {
      const { data } = await axios.get<IElement<IInventory>>(url, {
        headers: { Authorization: props.key },
      });

      const transformedData: IElement<IInventory> = {
        ...data,
        elements: data.elements.map((element: IInventory) => ({
          ...element,
          parsedPrice: digitFormatter.format(element.price / 100),
        })),
      };

      return transformedData;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }

  async get(props: IEndpointProps & IEntity): Promise<IInventory> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/items/${props.id}`;

    try {
      const { data } = await axios.get<IInventory>(url, {
        headers: { Authorization: props.key },
      });

      return data;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }
}
