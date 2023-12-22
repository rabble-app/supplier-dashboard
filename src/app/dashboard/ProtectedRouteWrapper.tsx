/** @format */

import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

const ProtectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const authUser = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    const token = localStorage.token;
    if (!token) {
      router.push('/');
    } else if (token && !authUser?.isVerified) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [router, authUser?.isVerified]);

  if (isLoading) {
    return (
      <div className='flex flex-col pt-[40vh] items-center h-screen'>
        <Spin size='large' className='custom-spin' />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRouteWrapper;
