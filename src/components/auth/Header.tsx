/** @format */

import React from 'react';

interface IHeader {
  title: string;
  subtitle?: string;
  className?: string;
}

const Header = ({ title, subtitle, className }: IHeader) => {
  return (
    <div>
      <h2
        className={`font-gosha font-bold text-[32px] leading-[38px] ${className}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className='text-grey-2 text-sm leading-6 mt-2 font-light'>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
