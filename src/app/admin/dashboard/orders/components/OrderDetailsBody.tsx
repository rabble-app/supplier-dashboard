/** @format */

import React from 'react';
import OrderDetailsAddress from './OrderDetailsAddress';

interface IOrderDetailsBody {
  children: React.ReactNode;
  producerName: string;
  producerAddress: string;
  producerVat: number;
  orderNo: string;
  createdAt: string;
  producerPaymentTerm: number;
  producerPaymentDue: string;
  hostName: string;
  hostAddress: string;
}

const OrderDetailsBody = ({
  children,
  producerName,
  producerAddress,
  producerVat,
  orderNo,
  createdAt,
  producerPaymentTerm,
  producerPaymentDue,
  hostName,
  hostAddress,
}: IOrderDetailsBody) => {
  return (
    <div className='bg-white-1 px-6 pt-7 pb-6 rounded-b-lg'>
      <div className='flex justify-between items-start'>
        <div>
          <OrderDetailsAddress
            title=''
            name={producerName}
            list={producerAddress ? [...producerAddress?.split(',')] : ['N/A']}
          />
          <p className='text-[10px] font-normal leading-[18px] text-grey-5'>
            VAT#{' '}
            <span className='text-grey-2 font-medium'>
              {producerVat || 'N/A'}
            </span>
          </p>
        </div>

        <div className='w-[160px]'>
          <div className='flex justify-between h-[15px]'>
            <p className='text-grey-5 text-[10px] font-normal'>Purchase Order No:</p>
            <span className='text-grey-6 text-[10px] font-medium'>
              {orderNo}
            </span>
          </div>
          <div className='flex justify-between h-[15px]'>
            <p className='text-grey-5 text-[10px] font-normal'>Purchase Order Date:</p>
            <span className='text-grey-6 text-[10px] font-medium'>
              {createdAt}
            </span>
          </div>
          {/* <div className='flex justify-between h-[15px]'>
            <p className='text-grey-5 text-[10px] font-normal'>
              Payment Terms:
            </p>
            <span className='text-grey-6 text-[10px] font-medium'>
              Net {producerPaymentTerm || 'N/A'}
            </span>
          </div>
          <div className='flex justify-between h-[18px]'>
            <p className='text-grey-5 text-[10px] font-normal'>Payment Due:</p>
            <span className='text-grey-6 text-[10px] font-medium'>
              {producerPaymentDue}
            </span>
          </div> */}
        </div>
      </div>
      <hr className='border-0 border-t-[1px] border-grey-4 mt-8 mb-1.5' />
      <div className='flex justify-between'>
        <OrderDetailsAddress
          title='Delivery address'
          name={hostName}
          list={hostAddress?.split(',')}
        />

        <OrderDetailsAddress
          title='Bill to'
          name='Postcode Collective'
          list={[
            'Company number: 14712713',
            '128 City Road',
            'London',
            'EC1V 2NX',
          ]}
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default OrderDetailsBody;
