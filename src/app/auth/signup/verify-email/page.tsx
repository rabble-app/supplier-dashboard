/** @format */
'use client';

import { useEffect, useTransition } from 'react';
import Image from 'next/image';
import { Spin } from 'antd';

import Button from '@/components/Button';
import LeftPanel from '@/components/auth/LeftPanel';
import Alert from '@/components/Alert';
import Header from '@/components/auth/Header';
import BackButton from '@/components/BackButton';
import usePage from './usePage';

const JoinRabblePage = () => {
  const [isPending, startTransition] = useTransition();
  const [isPendingResend, startTransitionResend] = useTransition();

  const {
    postVerifyEmail,
    postResendEmailVerification,
    isEmailVerified,
    token,
    authUser,
  } = usePage();

  useEffect(() => {
    if (token) {
      startTransition(() => postVerifyEmail(token));
    }
    // eslint-disable-next-line
  }, [token]);

  if (isPending || token) {
    return (
      <div className='flex flex-col pt-[40vh] items-center h-screen bg-black'>
        <Spin size='large' className='custom-spin' />
        <h1 className='font-gosha text-2xl text-white'>
          Verifying Email, please wait...
        </h1>
      </div>
    );
  }

  return (
    <>
      {
        <div className='flex'>
          <LeftPanel
            finishMessage={
              isEmailVerified ? 'Finish setting up your supplier account' : ''
            }
          />
          <div className='w-full px-5 pt-10 pb-6 relative'>
            <div className='flex flex-col justify-between h-full '>
              <div className='h-4 w-[32%] bg-blue-1 absolute top-0 left-0'></div>
              <div className='flex flex-col justify-between h-full'>
                <div className={`flex flex-col gap-4`}>
                  {!isEmailVerified && <BackButton />}
                  <Header
                    title={
                      isEmailVerified
                        ? 'Set up your supplier account'
                        : 'Join Rabble'
                    }
                    subtitle={
                      isEmailVerified
                        ? 'Enter your business details and an email address for receiving orders'
                        : ''
                    }
                  />
                  <Alert
                    message={
                      isEmailVerified
                        ? 'Your order email has been verified.'
                        : 'We’ve sent your an email, check your inbox to verify your order email'
                    }
                  />
                  <div className='mt-1'>
                    <div className='border-[1px] border-grey-4 rounded-lg flex flex-col justify-between'>
                      <div className='flex justify-between items-center px-[25px] py-4'>
                        <div>
                          <h2 className='text-2xl font-gosha text-black mb-1 capitalize'>
                            {authUser.businessName || 'N/A'}
                          </h2>
                          <p className='text-base text-grey-5 font-normal capitalize'>
                            {authUser.businessEmail || 'N/A'}
                          </p>
                        </div>
                        <div className='rounded-[50%] bg-black w-5 h-5 flex justify-center items-center'>
                          <Image
                            src='/images/icons/check.svg'
                            width={8.5}
                            height={5.6}
                            alt='check-icon'
                          />
                        </div>
                      </div>
                      <hr className='border-b-[1px] border-0  border-grey-4' />
                      <div className='px-[25px] py-4'>
                        <div>
                          <p className='text-base text-grey-2 font-normal mb-1'>
                            Didn’t receive the email?
                          </p>
                          <p className='text-base text-grey-5 font-normal'>
                            Check your spam folder or{' '}
                            <span
                              className='text-blue-1 underline cursor-pointer'
                              onClick={() =>
                                startTransitionResend(() =>
                                  postResendEmailVerification()
                                )
                              }
                            >
                              {isPendingResend ? (
                                <Spin className='ml-1 custom-spin' />
                              ) : (
                                ` resend email`
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {isEmailVerified && (
                  <Button
                    label='Continue'
                    to='/auth/signup/add-department-emails'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default JoinRabblePage;
