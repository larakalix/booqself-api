import type { IEntity } from './generic.entity';

export interface IEmployee extends IEntity {
  href: string;
  name: string;
  nickname: string;
  customId: string;
  email: string;
  inviteSent: boolean;
  pin: string;
  role: EmployeeRole;
  isOwner: boolean;
  orders: IOrders;
}

export interface IOrders {
  href: string;
}

export enum EmployeeRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}
