import { Observable } from 'rxjs';
import type { ICreatedAt, IElement, IEntity } from './generic.entity';
import type { IInventory } from './inventory.entity';
import type { IEmployee } from './employee.entity';

export interface IBook {
  tenant: ITenant;
  services: IElement<IInventory>;
  employees: IElement<IEmployee>;
}

export interface IObservableBook {
  tenant: Observable<ITenant>;
  services: Observable<IElement<IInventory>>;
  employees: Observable<IElement<IEmployee>>;
}

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
