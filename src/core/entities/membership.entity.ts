import type { IEntity, IServiceable } from './generic.entity';

export interface IMembership extends IEntity {
  name: string;
  price: number;
  tier: string;
  services: IMembershipService[];
}

export type IMembershipService = IServiceable & {
  tier: string;
};
