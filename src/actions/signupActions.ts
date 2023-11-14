/** @format */

'use server';
import axios from 'axios';

export const handleSetUpSupplierAccount = async (e: FormData) => {
  const businessName = e.get('businessName')?.toString();
  const email = e.get('email')?.toString();
  const password = e.get('password')?.toString();
  const businessAddress = e.get('businessAddress')?.toString();
  const phone = e.get('phone')?.toString();

  //   if (!businessName || !email || !password || !businessAddress || !phone)
  //     return;

  const newUser = {
    businessName,
    email,
    password,
    businessAddress,
    phone,
  };

  try {
    const res = await axios.post(
      'https://rabble-dev-9986f7458157.herokuapp.com/auth/register',
      newUser,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
