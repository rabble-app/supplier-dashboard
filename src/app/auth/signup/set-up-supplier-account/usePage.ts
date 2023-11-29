/** @format */

import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { handleSetUpSupplierAccount } from '@/actions/authActions';
import { logIn } from '@/redux/features/authSlice';
import { AppDispatch } from '@/redux/store';

const usePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const postSetUpSupplierAccount = async (e: FormData) => {
    try {
      const result = await handleSetUpSupplierAccount(e);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }

      localStorage.setItem('token', result.data.token);
      dispatch(logIn(result.data));
      router.push('/auth/signup/verify-email');
      message.success(result.message);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  return { postSetUpSupplierAccount };
};

export default usePage;
