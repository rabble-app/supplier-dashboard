/** @format */

import React from 'react';
import Button from '@/components/Button';

interface IOrderDetailsActions {
  activeTab: string;
}

const OrderDetailsActions = ({ activeTab }: IOrderDetailsActions) => {
  return (
    <div className='mt-10 mb-5'>
      <Button
        label='Download Invoice'
        className='!leading-5 !py-5 px-[70px] text-base bg-white-1 border-black border-[1.5px] w-full'
      />
      {/* <Button
        label={
          activeTab === 'successful' ? 'Order Completed' : 'Mark as Completed'
        }
        className={`!leading-5 !py-5 px-[70px] text-base ${
          activeTab === 'successful' ? '!bg-grey-4 text-grey-5' : ''
        }`}
      /> */}
    </div>
  );
};

export default OrderDetailsActions;
