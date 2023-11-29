/** @format */

import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.token;
    if (!token) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

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
