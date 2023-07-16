import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { handleError } from 'src/core/helper/endpoint.helper';
import type { IAppointment } from 'src/core/entities/appointment';

@Injectable()
export class AppointmentService {
  async getById(props: { appointmentId?: string }): Promise<IAppointment> {
    if (!props.appointmentId) return null;

    const url = `${process.env.STRAPI_URL}/appointments/${props.appointmentId}?populate=*`;

    try {
      const { data } = await axios.get<IAppointment>(url);

      return data;
    } catch (error: any) {
      handleError(error);
      throw error;
    }
  }
}
