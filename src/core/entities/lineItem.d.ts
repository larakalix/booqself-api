export interface ILineItem {
  id: string;
  orderRef: OrderRef;
  name: string;
  alternateName: string;
  price: number;
  parsedPrice: string;
  unitQty: number;
  printed: boolean;
  createdTime: number;
  orderClientCreatedTime: number;
  exchanged: boolean;
  refunded: boolean;
  isRevenue: boolean;
}

type OrderRef = {
  id: string;
};
