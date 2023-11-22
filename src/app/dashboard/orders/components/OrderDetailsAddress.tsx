/** @format */

import React from 'react';

interface IOrderDetailsAddress {
  title: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  flex?: boolean;
}

const OrderDetailsAddress = ({
  title,
  name,
  addressLine1,
  addressLine2,
  flex = false,
}: IOrderDetailsAddress) => {
  return (
    <div className={`${flex ? 'flex-1' : ''}`}>
      <p className='text-xs text-grey-5 font-medium font-gosha'>{title}</p>
      <h3 className='text-base text-grey-6 mb-1.5'>{name}</h3>
      <p className='text-xs leading-[18px] text-grey-2 font-medium'>
        {addressLine1}
      </p>
      <p className='text-xs leading-[18px] text-grey-2 font-medium'>
        {addressLine2}
      </p>
    </div>
  );
};

export default OrderDetailsAddress;
