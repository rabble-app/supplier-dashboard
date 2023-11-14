/** @format */

import React from 'react';
import Link from 'next/link';
import { Url } from 'url';

interface IButton {
  label: JSX.Element | string;
  onClick?: () => void;
  icon?: JSX.Element;
  className?: string;
  to?: string;
}

const Button = ({ label, to = '', onClick, icon, className }: IButton) => {
  const ButtonComponent = to ? Link : 'button';
  return (
    <ButtonComponent
      href={to}
      onClick={onClick}
      className={`font-gosha flex gap-[10px] justify-center items-center bg-primary text-black px-[18px] py-[25px] font-bold text-2xl leading-[30px] rounded-lg cursor-pointer transform hover:translate-y-[-1px] transition duration-300 hover:bg-primary-dark ${className} `}
    >
      {icon ? icon : null}
      {label}
    </ButtonComponent>
  );
};

export default Button;
