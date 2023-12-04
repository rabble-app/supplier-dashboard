/** @format */

import SearchIcon from '@/components/svgs/SearchIcon';
import Tabs from '@/components/Tabs';
import {
  subscriptionColumns,
  pendingLateCompletedColumns,
  invoiceItemsColumns,
  tabItems,
} from './util';
import { invoiceItems } from './data';
import { ITabConfig } from './interfaces';
import OrdersTable from './components/OrdersTable';
import OrdersDrawer from './components/OrdersDrawer';
import { handleGetSubscriptions } from '../ordersActions';

// TODO: REFACTOR
const Orders = async ({
  searchParams,
}: {
  searchParams?: {
    tab?: string;
    page?: string;
  };
}) => {
  const activeTab = searchParams?.tab || 'subscriptions';
  const currentPage = Number(searchParams?.page) || 1;

  const subscriptions = await handleGetSubscriptions(currentPage);

  const tabConfig: ITabConfig = {
    Subscriptions: {
      columns: subscriptionColumns,
      data: subscriptions.data[1],
      total: subscriptions.data[0],
    },
    'Pending orders': {
      columns: pendingLateCompletedColumns,
      data: subscriptions.data[1],
      total: subscriptions.data[0],
    },
    Completed: {
      columns: pendingLateCompletedColumns,
      data: subscriptions.data[1],
      total: subscriptions.data[0],
    },
    Late: {
      columns: pendingLateCompletedColumns,
      data: subscriptions.data[1],
      total: subscriptions.data[0],
    },
  };

  const activeTabConfig = tabConfig['Subscriptions'] || {};

  const { columns, data, total } = activeTabConfig;

  return (
    <>
      <div className='pt-8'>
        <div>
          <div className='flex items-center gap-2'>
            <h1 className='text-2xl text-grey-6 font-gosha font-bold'>
              Orders
            </h1>
            <span className='bg-blue-1 text-xs font-medium text-white px-2 py-0.5 rounded-[100px]'>
              {total} Teams
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

          <OrdersTable
            columns={columns}
            data={data}
            pageSize={7}
            total={total}
          />
        </div>
      </div>
      <OrdersDrawer
        invoiceItems={invoiceItems}
        invoiceItemsColumns={invoiceItemsColumns}
      />
    </>
  );
};

export default Orders;
