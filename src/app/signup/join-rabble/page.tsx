/** @format */
import Image from 'next/image';

import Button from '@/components/Button';
import LeftPanel from '@/components/auth/LeftPanel';
import Alert from '@/components/Alert';
import Header from '@/components/auth/Header';

const JoinRabblePage = () => {
  return (
    <div className='flex'>
      <LeftPanel finishMessage='Finish setting up your supplier account' />
      <div className='w-full px-5 pt-10 pb-6 relative'>
        <div className='flex flex-col justify-between h-full '>
          <div className='h-4 w-[32%] bg-blue-1 absolute top-0 left-0'></div>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-4 mt-6'>
              <Header
                title='Set up your supplier account'
                subtitle='Enter your business details and an email address for receiving orders'
              />
              <Alert message='Your order email has been verified.' />
              <div className='mt-1'>
                <div className='border-[1px] border-grey-4 rounded-lg flex flex-col justify-between'>
                  <div className='flex justify-between items-center px-[25px] py-4'>
                    <div>
                      <h2 className='text-2xl font-gosha text-black mb-1'>
                        Farm2Door
                      </h2>
                      <p className='text-base text-grey-5 font-normal'>
                        Maxwell@meatsupplier.com
                      </p>
                    </div>
                    <div className='rounded-[50%] bg-black w-5 h-5 flex justify-center items-center'>
                      <Image
                        src='/icons/check.svg'
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
                        <span className='text-blue-1 underline cursor-pointer'>
                          resend email
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button label='Continue' to='/signup/add-department-emails' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRabblePage;
