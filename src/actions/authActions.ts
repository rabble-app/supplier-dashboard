/** @format */

'use server';
import axios, { AxiosError } from 'axios';

const API_ENDPOINT = process.env.API_ENDPOINT;

export const handleSetUpSupplierAccount = async (e: FormData) => {
  const businessName = e.get('businessName')?.toString();
  const email = e.get('email')?.toString();
  const password = e.get('password')?.toString();
  const businessAddress = e.get('businessAddress')?.toString();
  const phone = e.get('phone')?.toString();

  const newUser = {
    businessName,
    email,
    password,
    businessAddress,
    phone,
  };

  try {
    const res = await axios.post(`${API_ENDPOINT}/auth/register`, newUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleLogin = async (e: FormData) => {
  const email = e.get('email')?.toString();
  const password = e.get('password')?.toString();

  const data = {
    email,
    password,
  };

  try {
    const res = await axios.post(`${API_ENDPOINT}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleVerifyEmail = async (token: string) => {
  try {
    const res = await axios.post(
      `${API_ENDPOINT}/auth/email-verification`,
      { token },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleResendEmailVerification = async (email: string) => {
  try {
    const res = await axios.post(
      `${API_ENDPOINT}/auth/resend-email-verification`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleResetPassword = async (e: FormData) => {
  const email = e.get('email')?.toString();

  try {
    const res = await axios.post(
      `${API_ENDPOINT}/auth/send-reset-password-link`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleChangePassword = async (e: FormData, token: string) => {
  const newPassword = e.get('password')?.toString();

  const data = {
    channel: 'PASSWORD_RESET',
    newPassword,
  };

  try {
    const res = await axios.post(`${API_ENDPOINT}/auth/change-password`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleAddDepartmentEmails = async (
  e: FormData,
  id: string,
  token: string
) => {
  const accountsEmail = e.get('accountsEmail')?.toString();
  const salesEmail = e.get('salesEmail')?.toString();

  const updateUser = {
    accountsEmail,
    salesEmail,
  };

  try {
    const res = await axios.patch(
      `${API_ENDPOINT}/users/producer/${id}`,
      updateUser,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleGetProducerCategories = async (token: string) => {
  try {
    const res = await axios.get(`${API_ENDPOINT}/users/producers/categories`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleAddProducerCategories = async (
  preparedData: any,
  token: string
) => {
  const data = {
    content: preparedData,
  };
  try {
    const res = await axios.patch(
      `${API_ENDPOINT}/users/producer/category/add`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};

export const handleAddDeliveryAddress = async (
  e: FormData,
  userId: string,
  token: string
) => {
  const buildingNo = e.get('buildingNo')?.toString();
  const address = e.get('address')?.toString();
  const city = e.get('city')?.toString();
  const postalCode = e.get('postalCode')?.toString();

  const deliveryAddress = {
    userId,
    buildingNo,
    address,
    city,
    postalCode,
  };

  try {
    const res = await axios.post(
      `${API_ENDPOINT}/users/delivery-address`,
      deliveryAddress,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    return error?.response?.data;
  }
};
