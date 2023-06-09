import type { IEntity, IServiceable } from './generic.entity';

export interface IAppointment extends IEntity {
  attributes: IAppointmentAttributes;
  meta: any;
}

export interface IAppointmentAttributes {
  name: string;
  email: string;
  comment: string;
  appointmentDay: string;
  phone: string;
  employee: IAppointmentEmployee;
  service: IAppointmentService;
}

export type IAppointmentEmployee = {
  name: string;
  cloverId: string;
  pin: string;
  email: string;
};

export type IAppointmentService = IServiceable;
