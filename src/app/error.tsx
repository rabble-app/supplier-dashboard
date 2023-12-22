/** @format */

'use client';

import Button from '@/components/Button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <h2 className='font-gosha'>Something went wrong!</h2>
      <Button
        label='Try again'
        className='!px-2=4 !py-2 text-sm mt-2'
        onClick={() => reset()}
      />
    </div>
  );
}
