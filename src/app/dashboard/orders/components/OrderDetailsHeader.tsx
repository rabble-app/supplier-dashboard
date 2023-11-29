/** @format */

import Image from 'next/image';
import React from 'react';

const OrderDetailsHeader = () => {
  return (
    <div className='bg-black p-6 rounded-t-lg flex justify-between items-center'>
      <div>
        <Image
          src='/images/icons/rabble.svg'
          width={108}
          height={24}
          alt='arrow-left-icon'
        />
        <p className='text-primary text-[10px] font-semibold mt-1 leading-4'>
          The Team Buying Platform
        </p>
      </div>
      <p className='text-grey-4 text-xs font-semibold leading-[18px]'>
        EC1V 2NX, 128 City Road
        <br />
        London, United Kingdom{' '}
      </p>
    </div>
  );
};

export default OrderDetailsHeader;
