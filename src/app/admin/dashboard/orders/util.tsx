/** @format */
'use client';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import {
  IAction,
  IInvoiceItemsData,
  IOrderStatus,
  IOrdersData,
  ISubscriptionsData,
  StatusClasses,
} from './interfaces';
import { capitalizeFirstLetter } from '@/utils';

export const getFilteredDataByStatus = (
  data: IOrdersData[],
  status: IOrderStatus
) => data.filter((item) => item.orderStatus === status);

export const getStatusClass = (status: IOrderStatus | string): string => {
  const statusClasses: StatusClasses = {
    Pending: 'bg-black text-primary',
    Successful: 'bg-primary text-black',
    Failed: 'bg-[#FFF3F5] text-[#FF1A35]',
    Default: '',
  };

  const statusKey =
    typeof status === 'string'
      ? (status as IOrderStatus)
      : IOrderStatus.Default;

  return statusClasses[statusKey] || '';
};

export const getStatusByTabName = (tab: string) => {
  let status: IOrderStatus = IOrderStatus.Default;

  if (tab === 'pending-orders') status = IOrderStatus.Pending;
  else if (tab === 'pending-delivery') status = IOrderStatus.Pending;
  else if (tab === 'successful') status = IOrderStatus.Successful;
  else if (tab === 'failed') status = IOrderStatus.Failed;

  return status;
};

export const handleAction = (
  id: number,
  onClickCallback: (id: number) => void
) => {
  onClickCallback(id);
};

const actions: IAction[] = [
  {
    key: 'view-more-details',
    label: (
      <p className='py-3.5 text-base font-medium flex gap-2'>
        <Image src='/images/icons/note.svg' width={24} height={24} alt='note' />
        View more details
      </p>
    ),
    onClick: (id, onClickCallback) => handleAction(id, onClickCallback),
  },
];

export const getActions = (id: number, onClickCallback: (id: number) => void) =>
  actions.map((action) => ({
    ...action,
    onClick: () => action.onClick(id, onClickCallback),
  }));

export const subscriptionColumns: ColumnsType<ISubscriptionsData> = [
  {
    title: 'Host name',
    dataIndex: 'hostName',
    key: 'hostName',
    render: (text) => <p>{text || 'N/A'}</p>,
  },
  {
    title: 'Postcode',
    dataIndex: 'postcode',
    key: 'postcode',
    render: (text) => (
      <span className='bg-[#00FF0A1A] text-green-1 leading-[18px] text-xs py-1 px-2 rounded-[100px]'>
        {text}
      </span>
    ),
  },
  {
    title: 'Subscription value',
    dataIndex: 'subscriptionValue',
    key: 'subscriptionValue',
    render: (text) => (
      <span className='bg-[#00FF0A1A] text-green-1 leading-[18px] text-xs py-1 px-2 rounded-[100px]'>
        £{text}.00
      </span>
    ),
  },
  {
    title: 'Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
    render: (text) => <p className='capitalize'>{text}</p>,
  },
  {
    title: 'Members',
    dataIndex: 'members',
    key: 'members',
  },
  {
    title: 'Active since',
    dataIndex: 'activeSince',
    key: 'activeSince',
  },
  {
    title: 'Successful deliveries',
    dataIndex: 'successfulDeliveries',
    key: 'successfulDeliveries',
    render: (text) => (
      <span className='bg-[#EEF4FF] text-blue-1 leading-[18px] text-xs py-1 px-2 rounded-[100px]'>
        {text || 0}
      </span>
    ),
  },
  {
    title: 'Next delivery',
    dataIndex: 'nextDelivery',
    key: 'nextDelivery',
    render: (text) => <p>{text || 'N/A'}</p>,
  },
];

export const ordersColumns: ColumnsType<IOrdersData> = [
  {
    title: 'Order id',
    dataIndex: 'orderId',
    key: 'orderId',
  },
  {
    title: 'Producer name',
    dataIndex: 'producerName',
    key: 'producerName',
  },
  {
    title: 'Host name',
    dataIndex: 'hostName',
    key: 'hostName',
  },
  {
    title: 'Postcode',
    dataIndex: 'postcode',
    key: 'postcode',
    render: (text) => (
      <span className='bg-[#00FF0A1A] text-green-1 leading-[18px] text-xs py-1 px-2 rounded-[100px]'>
        {text}
      </span>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (text) => <p>{text || 'N/A'}</p>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text) => (
      <span className='bg-[#EEF4FF] text-blue-1 leading-[18px] text-xs py-1 px-2 rounded-[100px]'>
        {text}
      </span>
    ),
  },
  {
    title: 'Order value',
    dataIndex: 'orderValue',
    key: 'orderValue',
    render: (text) => (
      <span className='bg-[#00FF0A1A] text-green-1 leading-[18px] text-xs py-1 px-2 rounded-[100px]'>
        £{text}.00
      </span>
    ),
  },
  {
    title: 'Expected delivery',
    dataIndex: 'expectedDelivery',
    key: 'expectedDelivery',
    render: (text) => <span>{text || 'N/A'}</span>,
  },
  {
    title: 'Order Status',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    render: (text) => (
      <span
        className={`${getStatusClass(
          capitalizeFirstLetter(text.toLowerCase())
        )} leading-[18px] text-xs py-1 px-2 rounded-[100px] capitalize`}
      >
        {text.toLowerCase()}
      </span>
    ),
  },
];

export const invoiceItemsColumns: ColumnsType<IInvoiceItemsData> = [
  {
    title: 'SKU code',
    dataIndex: 'skuCode',
    key: 'skuCode',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Product name',
    dataIndex: 'productName',
    key: 'productName',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Measure',
    dataIndex: 'measure',
    key: 'measure',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Unit Cost',
    dataIndex: 'unitCost',
    key: 'unitCost',
    render: (text) => <p className='text-right'>£{text}.00</p>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text) => <p className='text-right'>X{text}</p>,
  },
  {
    title: 'Total Ex VAT',
    dataIndex: 'totalExVat',
    key: 'totalExVat',
    render: (text) => <p className='text-right'>£{text}.00</p>,
  },
  {
    title: 'Total Inc VAT',
    dataIndex: 'totalIncVat',
    key: 'totalIncVat',
    render: (text) => <p className='text-right'>£{text}.00</p>,
  },
];
