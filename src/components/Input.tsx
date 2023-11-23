/** @format */

'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface IInput {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  className?: string;
  leftIcon?: string;
}

const Input = ({
  id,
  label,
  placeholder = '',
  type,
  className = '',
  leftIcon,
}: IInput) => {
  const [showPassword, setShowPassword] = useState(false);

  let inputType = type;

  if (inputType === 'password' && showPassword) {
    inputType = 'text';
  }

  return (
    <div className='flex flex-col'>
      <label
        className='text-grey-2 leading-6 text-base font-medium mb-1'
        htmlFor={id}
      >
        {label}
      </label>
      <div className='flex flex-col relative'>
        {leftIcon && (
          <Image
            src={leftIcon}
            width={24}
            height={24}
            alt='eye-icon'
            className='absolute left-[25px] top-7'
          />
        )}
        <input
          id={id}
          className={`bg-grey-1 rounded-lg leading-[30px] p-[25px] ${
            leftIcon ? 'pl-[60px]' : ''
          } text-xl placeholder:text-grey-3 placeholder:font-light focus:outline-primary-light-1 ${className}`}
          type={inputType}
          placeholder={placeholder}
        />
        {type == 'password' && (
          <Image
            src='/icons/eye.svg'
            width={24}
            height={24}
            alt='eye-icon'
            className='absolute right-[25px] top-7'
            onClick={() => setShowPassword((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
