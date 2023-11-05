/** @format */

'use client';
import Link from 'next/link';
import PhoneInput from 'react-phone-number-input';

import Button from '@/components/Button';
import Input from '@/components/Input';
import LeftPanel from '@/components/auth/LeftPanel';
import Header from '@/components/auth/Header';
import 'react-phone-number-input/style.css';

const SetUpSupplierAccountPage = () => {
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
          <div className='flex flex-col gap-4 mt-6'>
            <Input
              id='bus_name'
              label='Business Name'
              type='text'
              placeholder='e.g. Veg Supplier'
            />
            <Input
              id='bus_email'
              label='Email'
              type='email'
              placeholder='e.g. Maxwell@meatsupplier.com'
            />
            <Input
              id='bus_password'
              label='Password'
              type='password'
              placeholder='password'
            />
            <Input
              id='bus_address'
              label='Business Address'
              type='text'
              placeholder='e.g. street 17, NJ98, London'
            />

            <div className='flex flex-col'>
              <label className='text-grey-2 leading-6 text-base font-medium mb-1'>
                Business Phone Number
              </label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry='GB'
                value=''
                onChange={() => {}}
              />
            </div>
            <Button
              className='mt-12 mb-[44px]'
              label='Get Started'
              to='/signup/join-rabble'
            />
          </div>
        </div>

        <p className='text-lg text-center font-gosha'>
          Already have an account?{' '}
          <Link href='/' className='w-fit'>
            <span className='text-blue-1 cursor-pointer'>Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SetUpSupplierAccountPage;
