export interface Inventory {
  id: string;
  hidden: boolean;
  available: boolean;
  autoManage: boolean;
  name: string;
  price: number;
  parsedPrice: string;
  priceType: string;
  defaultTaxRates: boolean;
  cost: number;
  isRevenue: boolean;
  modifiedTime: number;
}

export enum InventoryPriceType {
  FIXED = 'FIXED',
  VARIABLE = 'VARIABLE',
}

export class IInventory implements Inventory {
  id: string;
  hidden: boolean;
  available: boolean;
  autoManage: boolean;
  name: string;
  price: number;
  parsedPrice: string;
  priceType: InventoryPriceType;
  defaultTaxRates: boolean;
  cost: number;
  isRevenue: boolean;
  modifiedTime: number;

  constructor() {
    this.id = '';
    this.hidden = false;
    this.available = false;
    this.autoManage = false;
    this.name = '';
    this.price = 0;
    this.priceType = InventoryPriceType.FIXED;
    this.defaultTaxRates = false;
    this.cost = 0;
    this.isRevenue = false;
    this.modifiedTime = 0;
  }
}
