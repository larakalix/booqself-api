import type { IDatable, IElement } from './generic';
import type { IInventory } from './inventory';
import type { IEmployee } from './employee';
import type { IAppointment } from './appointment';
import type { ITenant } from './tenant';

export interface IBook {
  tenant: IDatable<ITenant>;
  services: IElement<IInventory>;
  employees: IElement<IEmployee>;
  appointment: IAppointment | null;
}
