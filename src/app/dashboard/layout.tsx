/** @format */

import Navbar from '@/navigation/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-white-1 h-screen'>
      <Navbar />
      <div className='px-5'>{children}</div>
    </div>
  );
}
