/** @format */
'use client';
import PhoneInput from 'react-phone-number-input';

const PhoneNumberInput = ({
  name,
  required,
  value,
  disabled,
  onChange
}: {
  name: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  onChange?: any;
}) => {
  return (
    <PhoneInput
      defaultCountry='GB'
      onChange={()=>{}}
      value={value}
      name={name}
      disabled={disabled}
      required={required}
    />
  );
};

export default PhoneNumberInput;
