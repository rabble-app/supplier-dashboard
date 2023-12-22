/** @format */

import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

import {
  handleAddProducerCategories,
  handleGetProducerCategories,
} from '@/actions/authActions';
import { useAppSelector } from '@/redux/store';

const usePage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const authUser = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    getProducerCategories();
  }, []);

  const getProducerCategories = async () => {
    const token = localStorage.token;
    try {
      const result = await handleGetProducerCategories(token);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      console.log('Server action result:', result.data);
      setCategories(result.data);
      message.success(result.message);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  const postAddProducerCategories = async (categoryIds: string[]) => {
    const token = localStorage.token;

    const preparedData = categoryIds.map((catId) => {
      return {
        producerId: authUser?.id,
        producerCategoryOptionId: catId,
      };
    });

    try {
      const result = await handleAddProducerCategories(preparedData, token);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }
      console.log('Server action result:', result.data);

      router.push('/auth/signup/add-delivery-address');
      message.success(result.message);
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      console.log('Error in server action:', errorObject);
      message.error(errorObject.message);
    }
  };

  return { getProducerCategories, postAddProducerCategories, categories };
};

export default usePage;
