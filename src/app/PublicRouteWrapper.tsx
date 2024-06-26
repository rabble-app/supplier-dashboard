/** @format */

'use client';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

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
    const url = authUser.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
    if (token && !pathname.startsWith(url) && authUser?.isVerified) {
      router.push(url + '/');
      setRedirected(true);
    } else {
      setIsLoading(false);
    }
  }, [router, redirected, pathname, authUser]);

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
