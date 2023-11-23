/** @format */
'use client';
import { useTransition } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';

import Button from '@/components/Button';
import Input from '@/components/auth/Input';
import LeftPanel from '@/components/auth/LeftPanel';
import Header from '@/components/auth/Header';
import PhoneNumberInput from '@/components/PhoneInput';
import usePage from './usePage';
import 'react-phone-number-input/style.css';

const SetUpSupplierAccountPage = () => {
  const [isPending, startTransition] = useTransition();

  const { postSetUpSupplierAccount } = usePage();

  return (
    <div className='flex'>
      <LeftPanel />
      <div className='w-full px-5 pt-10 pb-6 h-full relative'>
        <div className='h-4 w-[15%] bg-blue-1 absolute top-0 left-0'></div>
        <div className='flex flex-col'>
          <Header
            title='Set up your supplier account'
            subtitle='Enter your business details and an email address for receiving orders'
          />
          <form
            action={(e) => startTransition(() => postSetUpSupplierAccount(e))}
          >
            <div className='flex flex-col gap-4 mt-6'>
              <Input
                id='bus_name'
                label='Business Name'
                type='text'
                name='businessName'
                placeholder='e.g. Veg Supplier'
                required={true}
              />
              <Input
                id='bus_email'
                label='Email'
                type='email'
                name='email'
                placeholder='e.g. Maxwell@meatsupplier.com'
                required={true}
              />
              <Input
                id='bus_password'
                label='Password'
                type='password'
                name='password'
                placeholder='password'
                required={true}
              />
              <Input
                id='bus_address'
                label='Business Address'
                type='text'
                name='businessAddress'
                placeholder='e.g. street 17, NJ98, London'
                required={true}
              />

              <div className='flex flex-col'>
                <label className='text-grey-2 leading-6 text-base font-medium mb-1'>
                  Business Phone Number
                </label>
                <PhoneNumberInput name='phone' required={true} />
              </div>
              <Button
                className='mt-12 mb-[44px]'
                label={isPending ? <Spin /> : 'Get Started'}
              />
            </div>
          </form>
        </div>

        <h4 className='text-lg text-center font-gosha'>
          Already have an account?{' '}
          <Link href='/' className='w-fit'>
            <span className='text-blue-1 cursor-pointer'>Log in</span>
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SetUpSupplierAccountPage;
