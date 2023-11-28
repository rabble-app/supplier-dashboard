/** @format */
'use client';
import { Spin } from 'antd';
import { useTransition } from 'react';

import LeftPanel from '@/components/auth/LeftPanel';
import Header from '@/components/auth/Header';
import Input from '@/components/auth/Input';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';
import usePage from './usePage';

const AddDeliveryAddress = () => {
  const [isPending, startTransition] = useTransition();

  const { postAddDeliveryAddress } = usePage();

  return (
    <div className='flex'>
      <LeftPanel finishMessage='Finish setting up your supplier account' />
      <div className='w-full px-5 pt-10 pb-6  relative'>
        <div className='flex flex-col h-full'>
          <div className='h-4 w-full bg-blue-1 absolute top-0 left-0'></div>
          <BackButton />

          <Header
            title='Add delivery address'
            subtitle='Adding delivery addresses  helps nearby customers to find you on RABBLE'
            className='mt-6'
          />

          <form
            action={(e) => startTransition(() => postAddDeliveryAddress(e))}
            className='flex flex-col justify-between h-full'
          >
            <div className='flex flex-col gap-6 mt-10'>
              <Input
                id='postcode'
                label='Postcode'
                type='text'
                name='postalCode'
                required={true}
                placeholder='e.g. NJU91'
                leftIcon='/icons/search.svg'
              />
              <Input
                id='building_number'
                label='Building Number'
                name='buildingNo'
                required={true}
                type='text'
                placeholder='Floor/Unit#'
              />
              <Input
                id='address_line1'
                label='Address line 1'
                name='address'
                required={true}
                type='text'
                placeholder='e.g. Street - 14, Block west'
              />
              <Input
                id='city'
                label='City'
                type='text'
                required={true}
                name='city'
                placeholder='London'
              />
            </div>
            <Button label={isPending ? <Spin /> : 'Continue'} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryAddress;
