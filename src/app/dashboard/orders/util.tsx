/** @format */
'use client';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import {
  IAction,
  IInvoiceItemsData,
  IOrderStatus,
  IPendingLateCompletedData,
  ISubscriptionsData,
} from './interfaces';

export const getFilteredDataByStatus = (
  data: IPendingLateCompletedData[],
  status: IOrderStatus
) => data.filter((item) => item.orderStatus === status);

export const getStatusClass = (status: IOrderStatus) => {
  const statusClasses = {
    Pending: 'bg-black text-primary',
    Delivered: 'bg-primary text-black',
    Late: 'bg-[#FFF3F5] text-[#FF1A35]',
    Default: '',
  };

  return statusClasses[status] || '';
};

export const getStatusByTabName = (tab: string) => {
  let status: IOrderStatus = 'Default';
  if (tab === 'Pending orders') status = 'Pending';
  else if (tab === 'Completed') status = 'Delivered';
  else if (tab === 'Late') status = 'Late';
  return status;
};

export const tabItems = [
  {
    name: 'subscriptions',
    quantity: 0,
  },
  {
    name: 'pending-orders',
    quantity: 32,
  },
  {
    name: 'completed',
    quantity: 32,
  },
  {
    name: 'late',
    quantity: 0,
  },
];

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

export const handleActionClick = () => {
  // console.log(id);
  return 'Newton';
  // if (activeTab !== 'Subscriptions') {
  //   setOpen(true);
  // }
};

const items = [
  { key: '1', label: 'Action 1', onClick: (a: any) => console.log(a) },
  { key: '2', label: 'Action 2', onClick: () => console.log(4) },
];

export const subscriptionColumns: ColumnsType<ISubscriptionsData> = [
  {
    title: 'Host name',
    dataIndex: 'hostName',
    key: 'hostName',
    render: (text) => <p>{text}</p>,
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
  // {
  //   title: ' ',
  //   key: '',
  //   render: (_, record) => (
  //     <Space size='middle' onClick={(e) => e.stopPropagation()}>
  //       <Dropdown
  //         menu={{
  //           items: [
  //             {
  //               key: record.key,
  //               label: (
  //                 <p className='py-3.5 text-base font-medium flex gap-2'>
  //                   <Image
  //                     src='/images/icons/note.svg'
  //                     width={24}
  //                     height={24}
  //                     alt='note'
  //                   />
  //                   View more details
  //                 </p>
  //               ),
  //             },
  //           ],
  //         }}
  //       >
  //         <Image
  //           src='/images/icons/more.svg'
  //           width={24}
  //           height={24}
  //           alt='more-icon'
  //           //className='pointer-events-none'
  //         />
  //       </Dropdown>
  //     </Space>
  //   ),
  // },
];

export const pendingLateCompletedColumns: ColumnsType<IPendingLateCompletedData> =
  [
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
    // {
    //   title: ' ',
    //   key: '',
    //   render: (_, record) => (
    //     <Space
    //       className='cursor-pointer'
    //       size='middle'
    //       onClick={(e) => e.stopPropagation()}
    //     >
    //       <Dropdown
    //         menu={{
    //           items: getActions(record.key, handleActionClick),
    //         }}
    //       >
    //         <Image
    //           src='/images/icons/more.svg'
    //           width={24}
    //           height={24}
    //           alt='more-icon'
    //         />
    //       </Dropdown>
    //     </Space>
    //   ),
    // },
  ];

export const invoiceItemsColumns: ColumnsType<IInvoiceItemsData> = [
  {
    title: 'Product code',
    dataIndex: 'productCode',
    key: 'productCode',
    render: (text) => <p>#{text}</p>,
  },
  {
    title: 'Product name',
    dataIndex: 'productName',
    key: 'productName',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <p>£{text}.00</p>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Total price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (text) => <p>£{text}.00</p>,
  },
];
