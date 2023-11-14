/** @format */
import { message } from 'antd';

import LoginPage from '@/components/auth/LoginPage';

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <main className='flex min-h-screen flex-col'>
      {contextHolder}
      <LoginPage />
    </main>
  );
}
