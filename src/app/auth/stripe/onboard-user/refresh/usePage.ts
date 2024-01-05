/** @format */
"use client"

import { message } from 'antd';
import { useRouter } from 'next/navigation';

import { handleStripeOnboardingRefresh } from '@/actions/authActions';
import { useState } from 'react';

const usePage = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const stripeOnboardingRefresh = async () => {
    try {
      setIsLoading(true)
      const accountId = localStorage.getItem('aId')
      if(accountId){
        const result = await handleStripeOnboardingRefresh(accountId);
        console.log(result)
        if (result.error) {
          throw new Error(JSON.stringify(result));
        }
        push(result.data.url)
      }
      setIsLoading(false) 
    } catch (error: any) {
      setIsLoading(false)
      const errorObject = JSON.parse(error.message);
      message.error(errorObject.message);
    }
  };

  return {
    stripeOnboardingRefresh,
    isLoading
  };
};

export default usePage;
