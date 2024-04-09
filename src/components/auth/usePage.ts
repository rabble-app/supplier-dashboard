/** @format */

import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { handleLogin } from '@/actions/authActions';
import { logIn } from '@/redux/features/authSlice';
import { AppDispatch } from '@/redux/store';

const usePage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const postLogin = async (e: FormData) => {
    try {
      const result = await handleLogin(e);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }

      const decoded: any = jwtDecode(result.data.token);
      const url = decoded.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';

      localStorage.setItem('token', result.data.token);

      dispatch(logIn({ ...result.data, role: decoded.role, stripeConnectId:result.data?.stripeConnectId }));
      console.log(result.data)
      router.push(`${url}/orders`);
      message.success(result.message);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  return { postLogin };
};

export default usePage;
