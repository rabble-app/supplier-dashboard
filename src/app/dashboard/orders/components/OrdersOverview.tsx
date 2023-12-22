/** @format */
'use client';
import { message } from 'antd';

import { ordersColumns, subscriptionColumns } from '../util';
import { ITabConfig } from '../interfaces';
import Tabs from '@/components/Tabs';
import SearchInput from '@/components/SearchInput';
import OrdersTable from './OrdersTable';
import { Suspense } from 'react';

interface IOrdersOverview {
  activeTab: string;
  pageSize: number;
  orders: any;
  subscriptions: any;
}

const OrdersOverview = ({
  activeTab,
  pageSize,
  orders,
  subscriptions,
}: IOrdersOverview) => {
  const {
    data: subscriptionsData,
    error: subscriptionsError,
    message: subscriptionsMessage,
  } = subscriptions;
  const {
    data: ordersData,
    error: ordersError,
    message: ordersMessage,
  } = orders;

  if (activeTab === 'subscriptions' && subscriptionsError) {
    message.error(subscriptionsMessage);
  }
  if (activeTab !== 'subscriptions' && ordersError) {
    message.error(ordersMessage);
  }

  const getOrdersTabConfig = () => ({
    columns: ordersColumns,
    data: ordersData?.[1],
    total: ordersData?.[0],
  });

  const tabConfig: ITabConfig = {
    subscriptions: {
      columns: subscriptionColumns,
      data: subscriptionsData?.[1],
      total: subscriptionsData?.[0],
    },
    'pending-orders': getOrdersTabConfig(),
    'pending-delivery': getOrdersTabConfig(),
    successful: getOrdersTabConfig(),
    failed: getOrdersTabConfig(),
  };

  const tabItems = [
    'subscriptions',
    'pending-orders',
    'pending-delivery',
    'successful',
    'failed',
  ].map((name) => ({
    name,
    quantity: name === 'subscriptions' ? 0 : ordersData?.[0] || 0,
  }));

  const activeTabConfig = tabConfig[activeTab] || {};

  const { columns, data, total } = activeTabConfig;

  return (
    <div className='pt-8'>
      <div>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl text-grey-6 font-gosha font-bold'>Orders</h1>
          <span className='bg-blue-1 text-xs font-medium text-white px-2 py-0.5 rounded-[100px]'>
            {subscriptionsData?.[0] || 0} Teams
          </span>
        </div>
        <p className='text-grey-2 text-sm'>
          Keep track of team orders and their status.
        </p>
      </div>
      <div className='mt-[30px] border-grey-4 border-[1px] rounded-lg py-5 bg-white '>
        <div className='flex justify-between items-center gap-[190px] px-4'>
          <Tabs items={tabItems} activeTab={activeTab} />
          <div className='w-1/3'>
            <SearchInput key={activeTab} placeholder='Search' />
          </div>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <OrdersTable
            pageSize={pageSize}
            columns={columns}
            data={data}
            total={total}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default OrdersOverview;
