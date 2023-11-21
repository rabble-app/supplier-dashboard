/** @format */
'use client';
import React, { useState } from 'react';
import { Table } from 'antd';

import SearchIcon from '@/components/svgs/SearchIcon';
import Tabs from '@/components/Tabs';
import {
  subscriptionColumns,
  pendingLateCompletedColumns,
  tabItems,
  getFilteredDataByStatus,
} from './util';
import { pendingLateCompletedOrders, subscriptions } from './data';
import {
  IPendingLateCompletedData,
  ISubscriptionsData,
  ITabConfig,
} from './interfaces';

const subscriptionsData: ISubscriptionsData[] = subscriptions;
const pendingLateCompletedData: IPendingLateCompletedData[] =
  pendingLateCompletedOrders;

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Subscriptions');

  const handleActionClick = (id: number) => {
    console.log(id);
  };

  const tabConfig: ITabConfig = {
    Subscriptions: {
      columns: subscriptionColumns(handleActionClick),
      data: subscriptionsData,
    },
    'Pending orders': {
      columns: pendingLateCompletedColumns(handleActionClick),
      data: getFilteredDataByStatus(pendingLateCompletedData, 'Pending'),
    },
    Completed: {
      columns: pendingLateCompletedColumns(handleActionClick),
      data: getFilteredDataByStatus(pendingLateCompletedData, 'Delivered'),
    },
    Late: {
      columns: pendingLateCompletedColumns(handleActionClick),
      data: getFilteredDataByStatus(pendingLateCompletedData, 'Late'),
    },
  };

  const activeTabConfig = tabConfig[activeTab] || {};

  const { columns, data } = activeTabConfig;

  return (
    <div className='pt-8'>
      <div>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl text-grey-6 font-gosha font-bold'>Orders</h1>
          <span className='bg-blue-1 text-xs font-medium text-white px-2 py-0.5 rounded-[100px]'>
            240 Teams
          </span>
        </div>
        <p className='text-grey-2 text-sm'>
          Keep track of team orders and their status.
        </p>
      </div>
      <div className='mt-[30px] border-grey-4 border-[1px] rounded-lg py-5 bg-white '>
        <div className='flex justify-between items-center gap-[190px] px-4'>
          <Tabs
            items={tabItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className='w-1/3'>
            <div className='relative'>
              <SearchIcon className='absolute top-3 left-5' stroke='#667085' />
              <input
                className='border-grey-4 border-[1px] h-12 rounded-lg pl-[50px] placeholder:text-grey-5 placeholder:font-medium focus:outline-primary-light-1 w-full'
                type='text'
                placeholder='Search'
              />
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 7,
          }}
          className='mt-9 custom-table'
        />
      </div>
    </div>
  );
};

export default Orders;
