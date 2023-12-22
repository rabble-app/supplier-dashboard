/** @format */

import { useState } from 'react';
import { message } from 'antd';

import { handleResetPassword } from '@/actions/authActions';

const usePage = () => {
  const [isEmailLinkSent, setIsEmailLinkSent] = useState(false);

  const postResetPassword = async (e: FormData) => {
    try {
      const result = await handleResetPassword(e);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      message.success(result.message);
      setIsEmailLinkSent(true);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  return {
    postResetPassword,
    isEmailLinkSent,
  };
};

export default usePage;
