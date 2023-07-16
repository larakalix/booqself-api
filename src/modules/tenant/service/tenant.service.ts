import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { appendQueryParams } from 'src/core/helper/url.helper';
import { handleError } from 'src/core/helper/endpoint.helper';
import type { IEndpointProps } from 'src/core/dtos/endpoint';
import type { IDatable } from 'src/core/entities/generic';
import type { ITenant } from 'src/core/entities/tenant';

@Injectable()
export class TenantService {
  async getById(
    props: IEndpointProps,
    justTenant?: boolean,
  ): Promise<IDatable<ITenant>> {
    const url = appendQueryParams(
      `${process.env.STRAPI_URL}/custom-tenant/${props.mId}`,
      { justTenant },
    );

    try {
      const { data } = await axios.get<IDatable<ITenant>>(url);

      return data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
