/** @format */
'use client';
import { Spin } from 'antd';
import React, { useTransition } from 'react';
import Link from 'next/link';

import Button from '../Button';
import Input from '../Input';
import Header from './Header';
import LeftPanel from './LeftPanel';
import usePage from './usePage';

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();

  const { postLogin } = usePage();

  return (
    <div className='flex'>
      <LeftPanel />
      <div className='w-full px-5 pt-10 pb-6'>
        <div className='flex flex-col justify-between h-full'>
          <div>
            <Header title='Log in to Rabble' />

            <form
              action={(e) => startTransition(() => postLogin(e))}
              className='flex flex-col gap-8 mt-14'
            >
              <Input
                id='email'
                label='Email'
                type='email'
                placeholder='e.g. Maxwell@meatsupplier.com'
                name='email'
                required={true}
              />
              <div>
                <Input
                  id='password'
                  label='Password'
                  type='password'
                  placeholder='password'
                  name='password'
                  required={true}
                />
                <Link href='/auth/forgot-password' className='block w-fit'>
                  <p className='text-blue-1 text-base mt-2.5 cursor-pointer w-fit'>
                    Forgot password?
                  </p>
                </Link>
              </div>
              <Button label={isPending ? <Spin /> : 'Log in'} />
            </form>
          </div>
          <h4 className='text-lg text-center font-gosha'>
            New to RABBLE?{' '}
            <Link href='/auth/signup/set-up-supplier-account'>
              <span className='text-blue-1 cursor-pointer'>
                set up a Supplier account
              </span>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
