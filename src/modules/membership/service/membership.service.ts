import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { handleError } from 'src/core/helper/endpoint.helper';
import { appendQueryParams } from 'src/core/helper/url.helper';
import type { IEndpointProps } from 'src/core/dtos/endpoint';
import type { IDatable } from 'src/core/entities/generic';
import type { IMembership } from 'src/core/entities/membership';

@Injectable()
export class MembershipService {
  async getAll(props: IEndpointProps): Promise<IDatable<IMembership>> {
    const url = appendQueryParams(
      `${process.env.STRAPI_URL}/custom-membership/${props.mId}`,
      {},
    );

    try {
      const { data } = await axios.get<IDatable<IMembership>>(url, {
        headers: { Authorization: props.key },
      });

      return data;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }
}
