/** @format */

'use client';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/redux/store';

const PublicRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirected, setRedirected] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const authUser = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    const token = localStorage.token;
    if (token && !pathname.startsWith('/dashboard') && authUser?.isVerified) {
      router.push('/dashboard');
      setRedirected(true);
    } else {
      setIsLoading(false);
    }
  }, [router, redirected, pathname, authUser.isVerified]);

  if (isLoading) {
    return (
      <div className='flex flex-col pt-[40vh] items-center h-screen'>
        <Spin size='large' className='custom-spin' />
      </div>
    );
  }

  return <>{children}</>;
};

export default PublicRouteWrapper;
