/** @format */
'use client';
import Navbar from '@/components/Navbar';
import ProtectedRouteWrapper from './ProtectedRouteWrapper';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRouteWrapper>
      <div className='bg-white-1 h-screen'>
        <Navbar />
        <div className='px-5'>{children}</div>
      </div>
    </ProtectedRouteWrapper>
  );
}
