import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { handleError } from 'src/core/helper/endpoint.helper';
import type { ICustomerMembership } from 'src/core/entities/customer-membership';
import { IAttributable, IDatable } from 'src/core/entities/generic';

@Injectable()
export class CustomerMembershipService {
  constructor(private readonly httpService: HttpService) {}

  // getAll(props: IEndpointProps): Observable<IElement<ICustomer>> {
  //   const baseUrl = getBaseUrl();
  //   const url = `${baseUrl}merchants/${props.mId}/customers?expand=emailAddresses%2CphoneNumbers`;

  //   return this.httpService
  //     .get<IElement<ICustomer>>(url, {
  //       headers: {
  //         Authorization: props.key,
  //       },
  //     })
  //     .pipe(
  //       map((response: AxiosResponse<IElement<ICustomer>>) => response.data),
  //       map((data: IElement<ICustomer>) => ({
  //         ...data,
  //         elements: data.elements.map((element: ICustomer) => ({
  //           ...element,
  //           emailAddressesList: element.emailAddresses.elements,
  //           phoneNumbersList: element.phoneNumbers.elements,
  //         })),
  //       })),
  //       catchError((error: AxiosError) => handleError(error)),
  //     );
  // }

  get(props: {
    customerMembership: ICustomerMembership;
  }): Observable<ICustomerMembership> {
    const url = `${process.env.STRAPI_URL}/customer-memberships?populate=*`;

    return this.httpService
      .post<ICustomerMembership>(url, props.customerMembership)
      .pipe(
        map((response: AxiosResponse<ICustomerMembership>) => response.data),
        catchError((error: AxiosError) => handleError(error)),
      );
  }
}
