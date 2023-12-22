/** @format */

'use client';
import React from 'react';
import { IItem } from '@/app/dashboard/orders/interfaces';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ITabs {
  items: IItem[];
  activeTab: string;
}

const Tabs = ({ activeTab, items }: ITabs) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    const tabNames = items.map((item) => item.name);

    if (tabNames.includes(tab)) {
      params.set('tab', tab);
      params.set('page', '1');
      params.delete('selected-row');
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className='flex border-grey-4 border-[1px] rounded-lg overflow-hidden'>
      {items?.map((item: any) => (
        <li
          key={item.name}
          className={`border-grey-4 border-r-[1px] last:border-0 px-4 py-2.5 text-grey-6 text-xs font-semibold cursor-pointer activeTab ${
            activeTab === item.name ? 'bg-[#f2f4f7]' : ''
          }`}
          onClick={() => handleTabChange(item.name)}
        >
          <div
            className={`${
              activeTab !== item.name ? 'opacity-30' : ''
            } capitalize`}
          >
            {item.name?.replace('-', ' ')}

            {item.quantity !== null && (
              <span className='text-primary bg-black rounded-[100px] py-0.5 px-2 text-[10px] ml-2.5'>
                {item.quantity}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
