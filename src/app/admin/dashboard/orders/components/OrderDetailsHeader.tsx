/** @format */

import Image from 'next/image';

import { getStatusByTabName, getStatusClass } from '../util';

interface IOrderDetailsHeader {
  activeTab: string;
  orderNo: string;
  deliveryDate: string;
}

const OrderDetailsHeader = ({
  activeTab,
  orderNo,
  deliveryDate,
}: IOrderDetailsHeader) => {
  return (
    <div className='bg-black py-4 pl-[18px] pr-[50px] rounded-t-lg flex justify-between items-center'>
      <div>
        <Image
          src='/images/icons/rabble.svg'
          width={108}
          height={24}
          alt='arrow-left-icon'
        />
        <p className='text-primary text-[10px] font-semibold mt-2 leading-4'>
          The Team Buying Platform
        </p>
      </div>
      <div className='flex items-center gap-4'>
        {!activeTab.includes('pending') && (
          <div
            className={`${getStatusClass(
              getStatusByTabName(activeTab)
            )} text-xs py-2 px-3 rounded-[100px] capitalize`}
          >
            {getStatusByTabName(activeTab)}
          </div>
        )}
        <div>
          <p className='text-[10px] font-normal text-white-3 mb-1'>
            Order No:{' '}
            <span className='font-medium text-primary-light-2'>{orderNo}</span>
          </p>
          <p className='text-[10px] font-normal text-white-3'>
            Delivery Date:{' '}
            <span className='font-medium text-primary-light-2'>
              {deliveryDate || 'N/A'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
