import { IElement } from './generic.entity';

export interface IOrder {
  href: string;
  id: string;
  currency: string;
  total: number;
  parsedTotal: string;
  paymentState: string;
  title: string;
  taxRemoved: boolean;
  isVat: boolean;
  state: string;
  manualTransaction: boolean;
  groupLineItems: boolean;
  testMode: boolean;
  payType: string;
  createdTime: number;
  clientCreatedTime: number;
  modifiedTime: number;
  lineItems: IElement<LineItem>;
  itemList: LineItem[];
}

export interface LineItem {
  name: string;
  price: number;
  parsedPrice: string;
  printed: boolean;
  createdTime: number;
  orderClientCreatedTime: number;
  exchanged: boolean;
  refunded: boolean;
  isRevenue: boolean;
}

export enum OrderPaymentState {
  PAID = 'PAID',
  OPEN = 'OPEN',
  VOIDED = 'VOIDED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}
