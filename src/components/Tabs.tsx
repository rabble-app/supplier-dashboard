/** @format */

'use client';
import React from 'react';

interface IItem {
  name: string;
  quantity: number;
}

interface ITabs {
  items: IItem[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = ({ activeTab, setActiveTab, items }: ITabs) => {
  return (
    <ul className='flex border-grey-4 border-[1px] rounded-lg overflow-hidden'>
      {items.map((item) => (
        <li
          key={item.name}
          className={`border-grey-4 border-r-[1px] px-4 py-2.5 text-grey-6 text-xs font-semibold cursor-pointer activeTab ${
            activeTab === item.name ? 'bg-[#f2f4f7]' : ''
          }`}
          onClick={() => setActiveTab(item.name)}
        >
          <div className={`${activeTab !== item.name ? 'opacity-30' : ''}`}>
            {item.name}
            {item.quantity > 0 && (
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
