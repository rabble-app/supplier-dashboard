/** @format */

import LeftPanel from '@/components/auth/LeftPanel';
import Header from '@/components/auth/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';

const AddDeliveryAddress = () => {
  return (
    <div className='flex'>
      <LeftPanel finishMessage='Finish setting up your supplier account' />
      <div className='w-full px-5 pt-10 pb-6  relative'>
        <div className='flex flex-col h-full'>
          <div className='h-4 w-full bg-blue-1 absolute top-0 left-0'></div>
          <BackButton />

          <Header
            title='Add delivery address'
            subtitle='Adding delivery addresses  helps nearby customers to find you on RABBLE'
            className='mt-6'
          />

          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-6 mt-10'>
              <Input
                id='postcode'
                label='Post Code'
                type='text'
                placeholder='e.g. NJU91'
                leftIcon='/icons/search.svg'
              />
              <Input
                id='building_number'
                label='Building Number'
                type='text'
                placeholder='Floor/Unit#'
              />
              <Input
                id='address_line1'
                label='Address line 1'
                type='text'
                placeholder='e.g. Street - 14, Block west'
              />
              <Input id='city' label='City' type='text' placeholder='London' />
            </div>
            <Button label='Continue' to='/' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryAddress;
