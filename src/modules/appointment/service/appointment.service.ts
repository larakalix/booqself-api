import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { handleError } from 'src/core/helper/endpoint.helper';
import type { IAppointment } from 'src/core/entities/appointment';
import { IDatable } from 'src/core/entities/generic';

@Injectable()
export class AppointmentService {
  async getById(props: { appointmentId?: string }): Promise<IAppointment> {
    if (!props.appointmentId) return null;

    const url = `${process.env.STRAPI_URL}/appointments/${props.appointmentId}?populate=*`;

    try {
      const { data } = await axios.get<IDatable<IAppointment>>(url);

      const transformedData: IAppointment = {
        ...data.data,
      };

      return transformedData;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }
}
