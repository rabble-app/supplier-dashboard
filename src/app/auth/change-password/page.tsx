/** @format */
'use client';
import React, { useTransition } from 'react';
import { Spin } from 'antd';

import LeftPanel from '@/components/auth/LeftPanel';
import Header from '@/components/auth/Header';
import Input from '@/components/auth/Input';
import Button from '@/components/Button';
import Alert from '@/components/Alert';
import usePage from './usePage';

const ChangePassword = () => {
  const [isPending, startTransition] = useTransition();

  const { postChangePassword } = usePage();

  return (
    <div className='flex'>
      <LeftPanel />
      <div className='w-full px-5 pt-10 pb-6'>
        <div className='flex flex-col justify-between h-full'>
          <div>
            <Header title='Change Password' />

            <form
              action={(e) => startTransition(() => postChangePassword(e))}
              className='flex flex-col gap-8 mt-14'
            >
              <Input
                id='password'
                label='New Password'
                type='password'
                name='password'
                required={true}
                placeholder='******'
              />
              <div>
                <Input
                  id='password'
                  label='Confirm New Password'
                  type='password'
                  name='password2'
                  required={true}
                  placeholder='******'
                />
              </div>
              <Button label={isPending ? <Spin /> : 'Change Password'} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
