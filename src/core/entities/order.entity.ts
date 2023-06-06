export interface Order {
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
}

export enum OrderPaymentState {
  PAID = 'PAID',
  OPEN = 'OPEN',
  VOIDED = 'VOIDED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export class IOrder implements Order {
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

  constructor() {
    this.href = '';
    this.id = '';
    this.currency = '';
    this.total = 0;
    this.paymentState = OrderPaymentState.OPEN;
    this.title = '';
    this.taxRemoved = false;
    this.isVat = false;
    this.state = '';
    this.manualTransaction = false;
    this.groupLineItems = false;
    this.testMode = false;
    this.payType = '';
    this.createdTime = 0;
    this.clientCreatedTime = 0;
    this.modifiedTime = 0;
  }
}
