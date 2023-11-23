/** @format */

'use client';
import Image from 'next/image';

interface ICloseButton {
  className?: string;
  onClick?: () => void;
}

const CloseButton = ({ className = '', onClick }: ICloseButton) => {
  return (
    <div
      className={`w-16 h-12 bg-black rounded-[100px] flex justify-center items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Image
        src='/icons/close.svg'
        width={32}
        height={32}
        alt='arrow-left-icon'
      />
    </div>
  );
};

export default CloseButton;
