/** @format */

import React from 'react';
import Link from 'next/link';

const LeftPanel = ({ finishMessage }: { finishMessage?: string }) => {
  return (
    <div className='w-full gradient-bg px-5 py-10 overflow-hidden sticky top-0'>
      <Link href='/'>
        <h1 className='text-[64px] font-normal text-primary font-gosha leading-[88px] mb-2'>
          Rabble
        </h1>
      </Link>
      <p className='text-white text-2xl leading-9 font-medium'>
        The online platform enabling producers to sell their products in large
        volumes direct to communities of buyers.
      </p>

      <p className='text-white text-2xl leading-9 font-medium mt-4'>
        {' '}
        {finishMessage}
      </p>
    </div>
  );
};

export default LeftPanel;
