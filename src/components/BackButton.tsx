/** @format */

'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <div
      className='w-16 h-12 bg-black rounded-[100px] flex justify-center items-center cursor-pointer'
      onClick={() => router.back()}
    >
      <Image
        src='/icons/arrow-left.svg'
        width={32}
        height={32}
        alt='arrow-left-icon'
      />
    </div>
  );
};

export default BackButton;
