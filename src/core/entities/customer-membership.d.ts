import type { ICreatedAt, IEntity } from './generic';

export interface ICustomerMembership extends IEntity, ICreatedAt {
  name: string;
  email: string;
  phone: string;
  cloverId: string;
}
