/** @format */

'use client';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PublicRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirected, setRedirected] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.token;
    if (token && !pathname.startsWith('/dashboard')) {
      router.push('/dashboard');
      setRedirected(true);
    } else {
      setIsLoading(false);
    }
  }, [router, redirected, pathname]);

  if (isLoading) {
    return (
      <div className='flex flex-col pt-[40vh] items-center h-screen'>
        <Spin size='large' className='custom-spin' />
      </div>
    );
  }

  console.log(45, window.location.host);

  return <>{children}</>;
};

export default PublicRouteWrapper;
