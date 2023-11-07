/** @format */

'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ISelect {
  id: string;
  label: string;
  placeholder?: string;
  className?: string;
  options?: { id: number; value: string }[];
}

const Select = ({
  id,
  label,
  placeholder = '',
  className = '',
  options,
}: ISelect) => {
  return (
    <div className='flex flex-col'>
      <label
        className='text-grey-2 leading-6 text-base font-medium mb-1'
        htmlFor={id}
      >
        {label}
      </label>
      <div className='flex flex-col relative'>
        <select
          id={id}
          className={`bg-grey-1 rounded-lg text-grey-6 leading-[30px] p-[25px] text-xl placeholder:text-grey-3 placeholder:font-light focus:outline-primary-light-1 ${className}`}
          defaultValue=''
        >
          <option disabled value=''>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.id}>{option.value}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;