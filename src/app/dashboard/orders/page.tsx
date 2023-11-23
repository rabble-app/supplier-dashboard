/** @format */
'use client';
import React, { useState } from 'react';
import { Table, Drawer } from 'antd';

import SearchIcon from '@/components/svgs/SearchIcon';
import Tabs from '@/components/Tabs';
import {
  subscriptionColumns,
  pendingLateCompletedColumns,
  invoiceItemsColumns,
  tabItems,
  getFilteredDataByStatus,
} from './util';
import {
  pendingLateCompletedOrders,
  subscriptions,
  invoiceItems,
} from './data';
import {
  IPendingLateCompletedData,
  ISubscriptionsData,
  ITabConfig,
} from './interfaces';
import CloseButton from '@/components/CloseButton';
import OrderDetailsHeader from './components/OrderDetailsHeader';
import OrderDetailsActions from './components/OrderDetailsActions';
import OrderDetailsBody from './components/OrderDetailsBody';

const subscriptionsData: ISubscriptionsData[] = subscriptions;
const pendingLateCompletedData: IPendingLateCompletedData[] =
  pendingLateCompletedOrders;

// TODO: REFACTOR
const Orders = () => {
  const [activeTab, setActiveTab] = useState('Subscriptions');
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const handleActionClick = (id: number) => {
    console.log(id);
    if (activeTab !== 'Subscriptions') setOpen(true);
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
    <>
      <div className='pt-8'>
        <div>
          <div className='flex items-center gap-2'>
            <h1 className='text-2xl text-grey-6 font-gosha font-bold'>
              Orders
            </h1>
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
                <SearchIcon
                  className='absolute top-3 left-5'
                  stroke='#667085'
                />
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
            className='mt-9 custom-table borderless'
          />
        </div>
      </div>
      <Drawer
        closeIcon={<CloseButton className='absolute right-5 top-5' />}
        placement='right'
        onClose={onClose}
        open={open}
        width={650}
        className='relative px-5 pt-14 custom-drawer'
      >
        <OrderDetailsHeader />
        <OrderDetailsBody activeTab={activeTab}>
          <h2 className='text-grey-6 font-gosha text-lg font-bold py-4'>
            Invoice items
          </h2>
          <div className='border-x-[1px] border-b-[1px] rounded-lg border-grey-4'>
            <Table
              columns={invoiceItemsColumns}
              dataSource={invoiceItems}
              pagination={false}
              className='custom-table'
            />
            <div className='bg-white flex flex-col items-end pr-6 gap-1 py-2.5 rounded-b-lg'>
              <p className='text-xs text-grey-5 font-medium'>
                Total order amount
              </p>
              <h2 className='text-grey-2 text-2xl font-gosha'>£240.00</h2>
            </div>
          </div>
        </OrderDetailsBody>
        <OrderDetailsActions activeTab={activeTab} />
      </Drawer>
    </>
  );
};

export default Orders;
