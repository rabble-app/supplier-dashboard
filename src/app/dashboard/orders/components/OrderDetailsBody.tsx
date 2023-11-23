/** @format */

import React from 'react';
import OrderDetailsAddress from './OrderDetailsAddress';
import OrderDetailsDate from './OrderDetailsDateStatus';
import { getStatusByTabName, getStatusClass } from '../util';

interface IOrderDetailsBody {
  activeTab: string;
  children: React.ReactNode;
}

const OrderDetailsBody = ({ activeTab, children }: IOrderDetailsBody) => {
  return (
    <div className='bg-white-1 px-6 pt-4 pb-6 rounded-b-lg'>
      {activeTab !== 'Pending orders' && (
        <>
          <div className='flex justify-between items-center'>
            <p className='text-xs text-blue-1 italic'>ORD-1562792771583</p>
            <p
              className={`${getStatusClass(
                getStatusByTabName(activeTab)
              )} text-xs font-medium leading-[18px] px-4 py-2 rounded-full`}
            >
              {getStatusByTabName(activeTab)}
            </p>
          </div>
          <hr className='border-0 my-4 border-t-[1px] border-grey-4' />
        </>
      )}
      {activeTab === 'Pending orders' ? (
        <>
          <div className='flex flex-col relative'>
            <div className='flex flex-col items-end'>
              <OrderDetailsDate label='placed on' date=' 22 June 2023' />
              <p
                className={`${getStatusClass(
                  getStatusByTabName(activeTab)
                )} text-xs font-medium leading-[18px] px-4 py-2 rounded-full`}
              >
                {getStatusByTabName(activeTab)}
              </p>
            </div>
            <p className='text-xs text-grey-2 font-medium absolute bottom-0.5'>
              Invoice:
              <span className='text-xs text-blue-1 italic'>
                ORD-1562792771583
              </span>
            </p>
          </div>
          <h3 className='text-base text-grey-6 mb-1.5'>Flying Horse Coffee</h3>
          <p className='text-xs leading-[18px] text-grey-2 font-medium'>
            B4A 7DA, Fremont street.
          </p>
          <p className='text-xs leading-[18px] text-grey-2 font-medium'>
            London, United Kingdom.
          </p>
          <hr className='border-0 mt-5 border-t-[1px] border-grey-4' />
        </>
      ) : (
        <div className='flex justify-between'>
          <OrderDetailsDate label='placed on' date=' 22 June 2023' flex />
          <OrderDetailsDate
            label={
              activeTab === 'Completed' ? 'delivered' : 'delivery expected'
            }
            date=' 01 July 2023'
            flex
          />
        </div>
      )}

      <div className='flex my-2.5 justify-between items-center'>
        <OrderDetailsAddress
          title='Shipping address'
          name='Flying Horse Coffee'
          addressLine1='B4A 7DA, Fremont street'
          addressLine2=' London, United Kingdom.'
          flex={activeTab !== 'Pending orders'}
        />

        <OrderDetailsAddress
          title='Bill to'
          name='Rabble'
          addressLine1=' EC1V 2NX, 128 City Road'
          addressLine2=' London, United Kingdom.'
          flex={activeTab !== 'Pending orders'}
        />
      </div>
      <hr className='border-0 border-t-[1px] border-grey-4' />
      <div>{children}</div>
    </div>
  );
};

export default OrderDetailsBody;
