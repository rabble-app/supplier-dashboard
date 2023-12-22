/** @format */
'use client';
import { Spin } from 'antd';
import { useState, useTransition } from 'react';

import LeftPanel from '@/components/auth/LeftPanel';
import Header from '@/components/auth/Header';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';
import Select from '@/components/Select';
import usePage from './usePage';

const ChooseMainCategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const [isPending, startTransition] = useTransition();

  const { categories, postAddProducerCategories } = usePage();

  const availableCategories =
    categories?.filter((cat: any) => !selectedCategoryIds.includes(cat.id)) ||
    [];

  const handleCategorySelected = (id: string) => {
    setSelectedCategoryIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

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

          <form
            action={() =>
              startTransition(() =>
                postAddProducerCategories(
                  selectedCategoryIds.concat(selectedCategoryId)
                )
              )
            }
            className='flex flex-col justify-between h-full'
          >
            <div className='flex flex-col gap-10 mt-10'>
              <Select
                id='main_category'
                label='Main Category'
                placeholder='Select a Category'
                options={availableCategories}
                onChange={setSelectedCategoryId}
                required={true}
              />

              <div>
                <label className='text-grey-2 text-base leading-6 font-light'>
                  Select any other categories you sell (optional)
                </label>
                <div className='mt-5 flex gap-4 flex-wrap w-[85%]'>
                  {!categories.length && (
                    <span>
                      <Spin className='custom-spin mr-1' /> Loading
                      categories...
                    </span>
                  )}
                  {categories.length > 0 &&
                    categories?.map((cat: any) => {
                      if (cat.id !== selectedCategoryId)
                        return (
                          <div
                            key={cat.id}
                            onClick={() => handleCategorySelected(cat.id)}
                            className={`${
                              selectedCategoryIds.includes(cat.id)
                                ? 'bg-black text-primary'
                                : 'bg-grey-1 text-grey-2'
                            }  rounded-[100px] text-base leading-5 font-gosha px-6 py-2.5 cursor-pointer select-none`}
                          >
                            <h4>{cat.name}</h4>
                          </div>
                        );
                    })}
                </div>
              </div>
            </div>
            <Button label={isPending ? <Spin /> : 'Continue'} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChooseMainCategoryPage;
