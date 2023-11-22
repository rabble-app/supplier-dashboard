/** @format */

import React from 'react';

interface IOrderDetailsDate {
  label: string;
  date: string;
  flex?: boolean;
}

const OrderDetailsDate = ({ label, date, flex = false }: IOrderDetailsDate) => {
  return (
    <div className={`flex flex-col ${flex ? 'flex-1' : ''}`}>
      <p className='text-grey-5 text-xs font-gosha font-normal'>
        Order {label}
      </p>
      <h4 className='text-sm text-grey-6 mt-1 mb-1.5 font-normal'>{date}</h4>
    </div>
  );
};

export default OrderDetailsDate;
