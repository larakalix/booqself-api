import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getBaseUrl, handleError } from 'src/core/helper/endpoint.helper';
import { IReadableService } from 'src/core/abstracts/generic-repo.abstract';
import type { IEndpointProps } from 'src/core/dtos/endpoint';
import type { IElement, IEntity } from 'src/core/entities/generic';
import type { IEmployee } from 'src/core/entities/employee';

@Injectable()
export class EmployeeService implements IReadableService<IEmployee> {
  async getAll(props: IEndpointProps): Promise<IElement<IEmployee>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}merchants/${props.mId}/employees`;

    try {
      const { data } = await axios.get<IElement<IEmployee>>(url, {
        headers: { Authorization: props.key },
      });

      return data;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }

  async get(props: IEndpointProps & IEntity): Promise<IEmployee> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/merchants/${props.mId}/employees/${props.id}`;

    try {
      const { data } = await axios.get<IEmployee>(url, {
        headers: { Authorization: props.key },
      });

      return data;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }
}
