/** @format */

import { Dropdown, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';

export interface ITabConfig {
  [key: string]: {
    columns: ColumnsType<any>;
    data: any[];
  };
}

interface Action {
  key: string;
  label: React.ReactNode;
  onClick: (id: number, onClickCallback: (id: number) => void) => void;
}

export const getFilteredDataByStatus = (
  data: IPendingLateCompletedData[],
  status: 'Pending' | 'Late' | 'Delivered'
) => data.filter((item) => item.orderStatus === status);

const getStatusClass = (status: 'Pending' | 'Late' | 'Delivered') => {
  const statusClasses = {
    Pending: 'bg-black text-primary',
    Delivered: 'bg-primary text-black',
    Late: 'bg-[#FFF3F5] text-[#FF1A35]',
  };

  return statusClasses[status] || '';
};

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

export const tabItems = [
  {
    name: 'Subscriptions',
    quantity: 0,
  },
  {
    name: 'Pending orders',
    quantity: 32,
  },
  {
    name: 'Completed',
    quantity: 32,
  },
  {
    name: 'Late',
    quantity: 0,
  },
];

export const handleAction = (
  id: number,
  onClickCallback: (id: number) => void
) => {
  onClickCallback(id);
};

const actions: Action[] = [
  {
    key: 'view-more-details',
    label: (
      <p className='py-3.5 text-base font-medium flex gap-2'>
        <Image src='/icons/note.svg' width={24} height={24} alt='note' />
        View more details
      </p>
    ),
    onClick: (id, onClickCallback) => handleAction(id, onClickCallback),
  },
];

const getActions = (id: number, onClickCallback: (id: number) => void) =>
  actions.map((action) => ({
    ...action,
    onClick: () => action.onClick(id, onClickCallback),
  }));

export const subscriptionColumns = (
  handleActionClick: (id: number) => void
): ColumnsType<ISubscriptionsData> => [
  {
    title: 'Host name',
    dataIndex: 'hostName',
    key: 'hostName',
    render: (text) => <a>{text}</a>,
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
        {text}
      </span>
    ),
  },
  {
    title: 'Next delivery',
    dataIndex: 'nextDelivery',
    key: 'nextDelivery',
  },
  {
    title: ' ',
    key: '',
    render: (_, record) => (
      <Space size='middle' onClick={(e) => e.stopPropagation()}>
        <Dropdown
          menu={{
            items: getActions(record.key, handleActionClick),
          }}
        >
          <Image src='/icons/more.svg' width={24} height={24} alt='more-icon' />
        </Dropdown>
      </Space>
    ),
  },
];

export const pendingLateCompletedColumns = (
  handleActionClick: (id: number) => void
): ColumnsType<IPendingLateCompletedData> => [
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
  },
  {
    title: 'Order Status',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    render: (text) => (
      <span
        className={`${getStatusClass(
          text
        )} leading-[18px] text-xs py-1 px-2 rounded-[100px]`}
      >
        {text}
      </span>
    ),
  },
  {
    title: ' ',
    key: '',
    render: (_, record) => (
      <Space
        className='cursor-pointer'
        size='middle'
        onClick={(e) => e.stopPropagation()}
      >
        <Dropdown
          menu={{
            items: getActions(record.key, handleActionClick),
          }}
        >
          <Image src='/icons/more.svg' width={24} height={24} alt='more-icon' />
        </Dropdown>
      </Space>
    ),
  },
];
