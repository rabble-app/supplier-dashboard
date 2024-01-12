/** @format */
"use client"

import { message } from 'antd';
import { useRouter } from 'next/navigation';

import { handleProducerRecordUpdate, handleGetStripeConnectAccountInfo } from '@/actions/authActions';
import { useState } from 'react';

const usePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const stripeOnboardingSuccess = async () => {
    try {
      setIsLoading(true)
      const supplierId = localStorage.getItem('sId')
      const accountId = localStorage.getItem('aId')
      if(accountId && supplierId){
        // check that charges are enabled in the user's stripe account
        let result = await handleGetStripeConnectAccountInfo(accountId);
        if(result && result.data.charges_enabled == true){
          result = await handleProducerRecordUpdate(supplierId, accountId);
        }else{
          push('/auth/stripe/onboard-user/refresh')
        }
        if (result.error) {
          throw new Error(JSON.stringify(result));
        }
      }
      setIsLoading(false) 
      localStorage.removeItem('sId')
      localStorage.removeItem('aId')
    } catch (error: any) {
      setIsLoading(false)
      const errorObject = JSON.parse(error.message);
      message.error(errorObject.message);
    }
  };

  return {
    stripeOnboardingSuccess,
    isLoading
  };
};

export default usePage;
