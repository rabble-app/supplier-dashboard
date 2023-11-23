/** @format */

import { useState } from 'react';
import { message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

import { handleChangePassword } from '@/actions/authActions';

const usePage = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(searchParams.get('token'));
  const router = useRouter();

  const postChangePassword = async (e: FormData) => {
    const token = localStorage.token;
    try {
      const result = await handleChangePassword(e, token);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      console.log('Server action result:', result.data);
      setToken('');
      router.push('/');
      message.success(result.message);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  return {
    postChangePassword,
    token,
  };
};

export default usePage;
