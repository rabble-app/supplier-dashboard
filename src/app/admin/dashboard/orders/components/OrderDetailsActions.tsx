/** @format */
'use client';
import { Spin } from 'antd';

import Button from '@/components/Button';

interface IOrderDetailsActions {
  activeTab: string;
  isActionLoading: boolean;
  onMarkOrderAsComplete: () => void;
}

const OrderDetailsActions = ({
  activeTab,
  isActionLoading,
  onMarkOrderAsComplete,
}: IOrderDetailsActions) => {
  const buttonLabel =
    activeTab === 'successful' ? 'Order Completed' : 'Mark as Completed';

  return (
    <div className='mt-10 mb-5 flex justify-between gap-6'>
      <Button
        label='Download Invoice'
        className='!leading-5 !py-5 px-[70px] text-base bg-white-1 w-full border-black border-[1.5px]'
      />
      {activeTab !== 'successful' && (
        <Button
          label={isActionLoading ? <Spin /> : buttonLabel}
          className={`!leading-5 !py-5 px-[70px] text-base w-full ${
            activeTab === 'successful' ? '!bg-grey-4 text-grey-5' : ''
          }`}
          onClick={onMarkOrderAsComplete}
        />
      )}
    </div>
  );
};

export default OrderDetailsActions;
