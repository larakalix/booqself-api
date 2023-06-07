import type { IEntity } from './generic.entity';

export interface IEmployee extends IEntity {
  name: string;
  nickname: string;
  email: string;
  pin: string;
  href: string;
  customId: string;
  inviteSent: boolean;
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
