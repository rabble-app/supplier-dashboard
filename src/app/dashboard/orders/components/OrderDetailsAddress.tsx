/** @format */

import React from 'react';

interface IOrderDetailsAddress {
  title: string;
  name: string;
  list: string[];
  flex?: boolean;
}

const OrderDetailsAddress = ({
  title,
  name,
  list,
  flex = false,
}: IOrderDetailsAddress) => {
  return (
    <div className={`${flex ? 'flex-1' : ''}`}>
      <p className='text-[10px] text-grey-5 font-normal font-gosha  mb-1 leading-3'>
        {title}
      </p>
      <h3 className='text-sm text-grey-6 mb-[2px] leading-[18px]'>{name}</h3>
      {list?.map((item, i) => (
        <p
          key={i}
          className='text-[10px] leading-[15px] text-grey-2 font-medium'
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default OrderDetailsAddress;
