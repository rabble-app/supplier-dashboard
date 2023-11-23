/** @format */

import React from 'react';
import Button from '@/components/Button';

interface IOrderDetailsActions {
  activeTab: string;
}

const OrderDetailsActions = ({ activeTab }: IOrderDetailsActions) => {
  return (
    <div className='flex justify-between absolute bottom-8 left-5 right-5'>
      <Button
        label='Download Receipt'
        className='!leading-5 !py-5 px-[70px] text-base bg-white-1 border-black border-[1.5px]'
      />
      <Button
        label={
          activeTab === 'Completed' ? 'Order Completed' : 'Mark as Completed'
        }
        className={`!leading-5 !py-5 px-[70px] text-base ${
          activeTab === 'Completed' ? 'bg-grey-4 text-grey-5' : ''
        }`}
      />
    </div>
  );
};

export default OrderDetailsActions;
