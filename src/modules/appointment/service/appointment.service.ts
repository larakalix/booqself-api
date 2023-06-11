import { Injectable } from '@nestjs/common';
import { Observable, map, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import type { IAppointment } from 'src/core/entities/appointment.entity';
import type { IDatable } from 'src/core/entities/generic.entity';

@Injectable()
export class AppointmentService {
  constructor(private readonly httpService: HttpService) {}

  getById(props: { appointmentId?: string }): Observable<IAppointment> {
    if (!props.appointmentId) return of(null);

    const url = `${process.env.STRAPI_URL}/appointments/${props.appointmentId}?populate=*`;

    return this.httpService
      .get<IDatable<IAppointment>>(url)
      .pipe(
        map(
          (response: AxiosResponse<IDatable<IAppointment>>) =>
            response.data.data,
        ),
      );
  }
}
