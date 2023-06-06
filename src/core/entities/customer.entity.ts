import type { IEntity } from './generic.entity';

export interface ICustomer extends IEntity {
  href: string;
  id: string;
  firstName: string;
  lastName: string;
  marketingAllowed: boolean;
  customerSince: number;
}
