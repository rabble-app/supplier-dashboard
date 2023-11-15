/** @format */

'use client';
import { Spin } from 'antd';
import { useTransition } from 'react';
import Link from 'next/link';

import Button from '@/components/Button';
import Input from '@/components/Input';
import LeftPanel from '@/components/auth/LeftPanel';
import BackButton from '@/components/BackButton';
import Alert from '@/components/Alert';
import Header from '@/components/auth/Header';
import usePage from './usePage';

const ForgotPasswordPage = () => {
  const [isPending, startTransition] = useTransition();

  const { isEmailLinkSent, postResetPassword } = usePage();

  return (
    <div className='flex'>
      <LeftPanel />
      <div className='w-full px-5 pt-10 pb-6'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <BackButton />
            <form
              action={(e) => startTransition(() => postResetPassword(e))}
              className='flex flex-col gap-6 mt-10'
            >
              <Header title='Reset password?' />

              {isEmailLinkSent && (
                <Alert
                  message='We’ve sent you an email, check your inbox for instructions on
                how to reset your password.'
                />
              )}

              <Input
                id='email'
                label='Email'
                type='email'
                name='email'
                required={true}
                placeholder='e.g. Maxwell@meatsupplier.com'
              />
              <Button label={isPending ? <Spin /> : 'Send Reset Link'} />
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
    </div>
  );
};

export default ForgotPasswordPage;
