/** @format */

import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className='flex flex-col pt-[40vh] items-center h-screen'>
      <Spin size='large' className='custom-spin' />
    </div>
  );
}
