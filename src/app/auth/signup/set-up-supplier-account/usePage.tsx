/** @format */

import { message } from 'antd';
import { useRouter } from 'next/navigation';

import { handleSetUpSupplierAccount } from '@/actions/signupActions';

const usePage = () => {
  const router = useRouter();

  const postSetUpSupplierAccount = async (e: FormData) => {
    try {
      const result = await handleSetUpSupplierAccount(e);
      console.log('Server action result:', result);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      router.push('/auth/signup/join-rabble');
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
