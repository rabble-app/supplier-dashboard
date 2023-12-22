/** @format */

import { message } from 'antd';
import { useRouter } from 'next/navigation';

import { handleAddDepartmentEmails } from '@/actions/authActions';
import { useAppSelector } from '@/redux/store';

const usePage = () => {
  const router = useRouter();
  const authUser = useAppSelector((state) => state.authReducer);

  const postAddDepartmentEmails = async (e: FormData) => {
    const token = localStorage.token;
    try {
      const result = await handleAddDepartmentEmails(e, authUser?.id, token);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      console.log('Server action result:', result.data);
      router.push('/auth/signup/choose-main-category');
      message.success(result.message);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  return { postAddDepartmentEmails };
};

export default usePage;
