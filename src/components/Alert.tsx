/** @format */

import React from 'react';

interface IAlert {
  message: String;
}

const Alert = ({ message }: IAlert) => {
  return (
    <p className='text-primary bg-black text-base px-7 py-[18px] rounded-lg'>
      {message}
    </p>
  );
};

export default Alert;
