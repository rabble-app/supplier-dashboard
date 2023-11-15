/** @format */

import { useState } from 'react';
import { message } from 'antd';
import { useSearchParams } from 'next/navigation';

import {
  handleResendEmailVerification,
  handleVerifyEmail,
} from '@/actions/authActions';
import { useAppSelector } from '@/redux/store';

const usePage = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(searchParams.get('token'));
  const authUser = useAppSelector((state) => state.authReducer);

  const postVerifyEmail = async (token: string) => {
    try {
      const result = await handleVerifyEmail(token);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      setToken('');
      setIsEmailVerified(true);
      message.success(result.message);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  const postResendEmailVerification = async () => {
    try {
      const result = await handleResendEmailVerification(
        authUser.businessEmail
      );
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      message.success(result.message);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  return {
    postVerifyEmail,
    postResendEmailVerification,
    isEmailVerified,
    token,
    authUser,
  };
};

export default usePage;
