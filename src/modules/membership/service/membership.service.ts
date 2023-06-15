import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { handleError } from 'src/core/helper/endpoint.helper';
import { appendQueryParams } from 'src/core/helper/url.helper';
import type { IEndpointProps } from 'src/core/dtos/endpoint.props';
import type { IDatable } from 'src/core/entities/generic.entity';
import type { IMembership } from 'src/core/entities/membership.entity';

@Injectable()
export class MembershipService {
  constructor(private readonly httpService: HttpService) {}

  getAll(props: IEndpointProps): Observable<IDatable<IMembership>> {
    const url = appendQueryParams(
      `${process.env.STRAPI_URL}/custom-membership/${props.mId}`,
      {},
    );

    return this.httpService.get<IDatable<IMembership>>(url).pipe(
      map((response: AxiosResponse<IDatable<IMembership>>) => response.data),
      catchError((error: AxiosError) => handleError(error)),
    );
  }
}
