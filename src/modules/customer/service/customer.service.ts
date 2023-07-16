import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import { IReadableService } from 'src/core/abstracts/generic-repo.abstract';
import type { IEndpointProps } from 'src/core/dtos/endpoint';
import type { IElement, IEntity } from 'src/core/entities/generic';
import type { ICustomer } from 'src/core/entities/customer';

@Injectable()
export class CustomerService implements IReadableService<ICustomer> {
  async getAll(props: IEndpointProps): Promise<IElement<ICustomer>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/customers?expand=emailAddresses%2CphoneNumbers`;

    try {
      const { data } = await axios.get<IElement<ICustomer>>(url, {
        headers: { Authorization: props.key },
      });

      const transformedData: IElement<ICustomer> = {
        ...data,
        elements: data.elements.map((element: ICustomer) => ({
          ...element,
          emailAddressesList: element.emailAddresses.elements,
          phoneNumbersList: element.phoneNumbers.elements,
        })),
      };

      return transformedData;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }

  async get(props: IEndpointProps & IEntity): Promise<ICustomer> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/customers/${props.id}?expand=emailAddresses%2CphoneNumbers`;

    try {
      const { data } = await axios.get<ICustomer>(url, {
        headers: { Authorization: props.key },
      });

      return data;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }
}
