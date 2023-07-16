import type { ICreatedAt, IEntity } from './generic';

export interface ITenant extends IEntity, ICreatedAt {
  name: string;
  email: string;
  tenantId: string;
  cloverMerchantId?: string;
  openingTime: Date;
  closingTime: Date;
  minutesInterval: number;
  timeZone: string;
  isActive: boolean;
}
