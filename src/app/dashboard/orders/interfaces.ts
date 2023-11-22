/** @format */

import { ColumnsType } from 'antd/es/table';

export interface ISubscriptionsData {
  key: number;
  hostName: string;
  postcode: string;
  subscriptionValue: number;
  frequency: string;
  members: string;
  activeSince: string;
  successfulDeliveries: string;
  nextDelivery: string;
}

export interface IPendingLateCompletedData {
  key: number;
  orderId: string;
  hostName: string;
  producerName: string;
  postcode: string;
  address: string;
  category: string;
  orderValue: number;
  expectedDelivery: string;
  orderStatus: string;
}

export type IOrderStatus = 'Pending' | 'Late' | 'Delivered' | 'Default';

export interface IInvoiceItemsData {
  key: number;
  productCode: string;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface IAction {
  key: string;
  label: React.ReactNode;
  onClick: (id: number, onClickCallback: (id: number) => void) => void;
}

export interface ITabConfig {
  [key: string]: {
    columns: ColumnsType<any>;
    data: any[];
  };
}
