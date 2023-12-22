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

export interface ISubscriptionAPIData {
  total: number;
  data: any[];
}

export interface IOrdersData {
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

export type StatusClasses = {
  [key in IOrderStatus]: string;
};

export enum IOrderStatus {
  Pending = 'Pending',
  'Pending Delivery' = 'Pending Delivery',
  Successful = 'Successful',
  Failed = 'Failed',
  Default = 'Default',
}

export enum IOrderStatusText {
  PENDING = 'PENDING',
  PENDING_DELIVERY = 'PENDING_DELIVERY',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  DEFAULT = 'DEFAULT',
}

export interface IInvoiceItemsData {
  key: number;
  skuCode: string;
  productName: string;
  measure: string;
  unitCost: number;
  quantity: number;
  totalExVat: number;
  totalIncVat: number;
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
    total: number;
  };
}

export interface IItem {
  name: string;
  quantity: number;
}
