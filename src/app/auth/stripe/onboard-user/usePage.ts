/** @format */
"use client"

import { message } from 'antd';
import { useRouter } from 'next/navigation';

import { handleStripeOnboarding } from '@/actions/authActions';
import { useState } from 'react';

const usePage = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const stripeOnboarding = async () => {
    try {
      setIsLoading(true)
      const result = await handleStripeOnboarding();
      setIsLoading(false)
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      localStorage.setItem('aId', result.data.accountId)
      push(result.data.url)
    } catch (error: any) {
      setIsLoading(false)
      const errorObject = JSON.parse(error.message);
      message.error(errorObject.message);
    }
  };

  return {
    stripeOnboarding,
    isLoading
  };
};

export default usePage;
