/** @format */
'use client';
import React from 'react';
import SearchIcon from '@/components/svgs/SearchIcon';

const Orders = () => {
  return (
    <div className='pt-8'>
      <div>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl text-grey-6 font-gosha font-bold'>Orders</h1>
          <span className='bg-blue-1 text-xs font-medium text-white px-2 py-0.5 rounded-[100px]'>
            240 Teams
          </span>
        </div>
        <p className='text-grey-2 text-sm'>
          Keep track of team orders and their status.
        </p>
      </div>
      <div className='mt-[30px] border-grey-4 border-[1px] rounded-lg py-5 px-4 bg-white '>
        <div className='flex justify-between items-center gap-[190px]'>
          <div className=''>
            <ul className='flex gap-3 border-grey-4 border-[1px] rounded-lg'>
              <li className='border-grey-4 border-r-[1px] px-4 py-3 text-grey-6 text-xs font-semibold cursor-pointer'>
                Subscriptions
              </li>
              <li className='border-grey-4 border-r-[1px] px-4 py-3 text-grey-6 text-xs font-semibold cursor-pointer'>
                Pending orders
              </li>
              <li className='border-grey-4 border-r-[1px] px-4 py-3 text-grey-6 text-xs font-semibold cursor-pointer'>
                Completed
              </li>
              <li className='px-4 py-3 text-grey-6 text-xs font-semibold cursor-pointer'>
                Late
              </li>
            </ul>
          </div>
          <div className='w-1/3'>
            <div className='relative'>
              <SearchIcon className='absolute top-3 left-5' stroke='#667085' />
              <input
                className='border-grey-4 border-[1px] h-12 rounded-lg pl-[50px] placeholder:text-grey-5 placeholder:font-medium focus:outline-primary-light-1 w-full'
                type='text'
                placeholder='Search'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
