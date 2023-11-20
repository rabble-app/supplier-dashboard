/** @format */
'use client';
import { useState } from 'react';

import LeftPanel from '@/components/auth/LeftPanel';
import Header from '@/components/auth/Header';
import Input from '@/components/auth/Input';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';
import Select from '@/components/Select';

const categories = [
  'Alcohol',
  'Bakery',
  'Coffee and Tea',
  'Dairy',
  'Drinks',
  'Fish and Seafood',
  'Fruits and Vegetables',
  'General',
  'Meat',
  'Speciality',
  'Supplies',
];

const ChooseMainCategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className='flex'>
      <LeftPanel finishMessage='Finish setting up your supplier account' />
      <div className='w-full px-5 pt-10 pb-6  relative'>
        <div className='flex flex-col h-full'>
          <div className='h-4 w-[75%] bg-blue-1 absolute top-0 left-0'></div>
          <BackButton />

          <Header
            title='Choose a main category for 
            your product'
            subtitle='Select the main category you specialise in to help customers find you on RABBLE.'
            className='mt-6'
          />

          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-10 mt-10'>
              <Select
                id='main_category'
                label='Main Category'
                placeholder='Select a Category'
                options={[
                  { id: 1, value: 'Beverages' },
                  { id: 2, value: 'Drinks' },
                ]}
              />

              <div>
                <label className='text-grey-2 text-base leading-6 font-light'>
                  Select any other categories you sell (optional)
                </label>
                <div className='mt-5 flex gap-4 flex-wrap w-[85%]'>
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`${
                        selectedCategory === cat
                          ? 'bg-black text-primary'
                          : 'bg-grey-1 text-grey-2'
                      }  rounded-[100px] text-base leading-5 font-gosha px-6 py-2.5 cursor-pointer`}
                    >
                      <h4>{cat}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button label='Continue' to='/auth/signup/add-delivery-address' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseMainCategoryPage;
