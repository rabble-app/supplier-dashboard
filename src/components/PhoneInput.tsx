/** @format */
'use client';
import PhoneInput from 'react-phone-number-input';

const PhoneNumberInput = ({
  name,
  required,
  value,
}: {
  name: string;
  required?: boolean;
  value?: string;
}) => {
  return (
    <PhoneInput
      defaultCountry='GB'
      onChange={() => {}}
      value={value}
      name={name}
      required={required}
    />
  );
};

export default PhoneNumberInput;
