/** @format */

import React from "react";
import Link from "next/link";

interface IButton {
  label: JSX.Element | string;
  onClick?: (e?:any) => void;
  icon?: JSX.Element;
  className?: string;
  to?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "danger" | "disabled";
  disabled?: boolean;
}

const Button = ({
  label,
  to = "",
  onClick,
  icon,
  className,
  size = "lg",
  variant = "primary",
  disabled = false
}: IButton) => {
  const ButtonComponent = to ? Link : "button";

  const BTN_SIZE_OPTIONS = {
    sm: "text-base leading-6 px-4 py-3",
    md: "text-sm !leading-4 !py-4 !px-9",
    lg: "text-2xl leading-[30px] px-[18px] py-[25px]",
  };

  const BTN_VARIANT_OPTIONS = {
    primary: "bg-primary text-black",
    danger: "bg-danger-light-1 text-danger",
    disabled: "bg-grey-4 text-black cursor-not-allowed",
  };

  let BTN_SIZE = BTN_SIZE_OPTIONS[size];
  let BTN_VARIANT = BTN_VARIANT_OPTIONS[variant];

  return (
    <ButtonComponent
      href={to}
      onClick={onClick}
      className={`font-gosha flex gap-[10px] justify-center items-center ${BTN_VARIANT} font-bold ${BTN_SIZE} rounded-lg cursor-pointer transform hover:translate-y-[-1px] transition duration-300 hover:bg-primary-dark ${className} `}
      disabled={disabled}
    >
      {icon ? icon : null}
      {label}
    </ButtonComponent>
  );
};

export default Button;
