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

const AddDepartmentEmailsPage = () => {
  const [isPending, startTransition] = useTransition();

  const { postAddDepartmentEmails } = usePage();

  return (
    <div className='flex'>
      <LeftPanel finishMessage='Finish setting up your supplier account' />
      <div className='w-full px-5 pt-10 pb-6  relative'>
        <div className='flex flex-col h-full'>
          <div className='h-4 w-[55%] bg-blue-1 absolute top-0 left-0'></div>
          <BackButton />

          <Header
            title='Add department emails'
            subtitle='Add an account email for anything related to invoices and payments, and a sales email for all new business enquiries.'
            className='mt-6'
          />

          <form
            action={(e) => startTransition(() => postAddDepartmentEmails(e))}
            className='flex flex-col justify-between h-full'
          >
            <div className='flex flex-col gap-6 mt-10'>
              <Input
                id='accounts_email'
                label='Accounts Email'
                type='email'
                name='accountsEmail'
                required={true}
                placeholder='e.g. accounts@meatsupplier.com'
              />
              <Input
                id='sales_email'
                label='Sales Email'
                type='email'
                name='salesEmail'
                required={true}
                placeholder='e.g. sales@meatsupplier.com'
              />
            </div>
            <Button label={isPending ? <Spin /> : 'Continue'} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentEmailsPage;
