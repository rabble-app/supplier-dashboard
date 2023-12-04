/** @format */
'use client';
import { Drawer, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CloseButton from '@/components/CloseButton';
import OrderDetailsHeader from './OrderDetailsHeader';
import OrderDetailsBody from './OrderDetailsBody';
import OrderDetailsActions from './OrderDetailsActions';
import { IInvoiceItemsData } from '../interfaces';

interface IOrdersDrawer {
  invoiceItems: IInvoiceItemsData[];
  invoiceItemsColumns: ColumnsType<IInvoiceItemsData>;
}

const OrdersDrawer = ({ invoiceItems, invoiceItemsColumns }: IOrdersDrawer) => {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const selectedRow = params.get('selected-row');
  const activeTab = params.get('tab') ?? 'subscriptions';

  useEffect(() => {
    if (selectedRow) {
      activeTab !== 'Subscriptions' && setOpen(true);
    }
  }, [selectedRow, activeTab]);

  const onClose = () => {
    setOpen(false);
    params.delete('selected-row');

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Drawer
      closeIcon={<CloseButton className='absolute right-5 top-5' />}
      placement='right'
      onClose={onClose}
      open={open}
      key={crypto.randomUUID()}
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
  );
};

export default OrdersDrawer;
