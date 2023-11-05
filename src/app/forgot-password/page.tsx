/** @format */

'use client';
import { useState } from 'react';
import Link from 'next/link';

import Button from '@/components/Button';
import Input from '@/components/Input';
import LeftPanel from '@/components/auth/LeftPanel';
import BackButton from '@/components/BackButton';
import Alert from '@/components/Alert';
import Header from '@/components/auth/Header';

const ForgotPasswordPage = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className='flex'>
      <LeftPanel />
      <div className='w-full px-5 pt-10 pb-6'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col'>
            <BackButton />
            <div className='flex flex-col gap-6 mt-10'>
              <Header title='Reset password?' />

              {showMessage && (
                <Alert
                  message='We’ve sent you an email, check your inbox for instructions on
                how to reset your password.'
                />
              )}

              <Input
                id='email'
                label='Email'
                type='email'
                placeholder='e.g. Maxwell@meatsupplier.com'
              />
              <Button
                label='Send Reset Link'
                onClick={() => setShowMessage(true)}
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
    </div>
  );
};

export default ForgotPasswordPage;
