/** @format */

'use client';

import React from 'react';
import { Dropdown, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ISubscriptionsData } from '../interfaces';

interface IOrdersTable {
  columns: ColumnsType<any>;
  data: any;
  pageSize: number;
  total: number;
}

const OrdersTable = ({ columns, data, pageSize, total }: IOrdersTable) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePaginationChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    params.get('selected-row') && params.delete('selected-row');

    replace(`${pathname}?${params.toString()}`);
  };

  const handleViewMoreClick = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('selected-row', id.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  const updatedColumns: ColumnsType<ISubscriptionsData> = [
    ...columns,
    {
      title: ' ',
      key: '',
      render: (_, record) => (
        <Space size='middle' onClick={(e) => e.stopPropagation()}>
          <Dropdown
            menu={{
              items: [
                {
                  key: record.key,
                  label: (
                    <p className='py-3.5 text-base font-medium flex gap-2'>
                      <Image
                        src='/images/icons/note.svg'
                        width={24}
                        height={24}
                        alt='note'
                      />
                      View more details
                    </p>
                  ),
                  onClick: () => handleViewMoreClick(record.key),
                },
              ],
            }}
          >
            <Image
              src='/images/icons/more.svg'
              width={24}
              height={24}
              alt='more-icon'
              //className='pointer-events-none'
            />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={updatedColumns}
      dataSource={data}
      pagination={{
        position: ['bottomCenter'],
        pageSize,
        total,
        onChange: handlePaginationChange,
      }}
      className='mt-9 custom-table borderless'
    />
  );
};

export default OrdersTable;
