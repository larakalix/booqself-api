export interface IInventory {
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
