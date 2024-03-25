/** @format */
"use client";

import { useState } from "react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

import {
  handleProducerRecordUpdate,
  handleGetStripeConnectAccountInfo,
} from "@/actions/authActions";
import { logIn } from "@/redux/features/authSlice";

const usePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAppSelector((state) => state.authReducer);
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const stripeOnboardingReturn = async () => {
    console.log("first");
    try {
      console.log("3");
      setIsLoading(true);
      const accountId = localStorage.getItem("aId");
      if (accountId && authUser?.id) {
        console.log("23");
        // check that charges are enabled in the user's stripe account
        let result = await handleGetStripeConnectAccountInfo(accountId);
        if (result && result.data.charges_enabled == true) {
          console.log("4");
          result = await handleProducerRecordUpdate(authUser?.id, accountId);
          dispatch(logIn({ ...authUser, stripeConnectId: result.data?.stripeConnectId }));
          message.success('You have completed your stripe onboarding successfully!');
          push('/dashboard')
        } else {
          console.log("5");
          localStorage.removeItem("aId");
          return push("/dashboard/stripe/onboard-user/refresh");
        }
        if (result.error) {
          throw new Error(JSON.stringify(result));
        }
      }
      console.log("77");
      setIsLoading(false);
      localStorage.removeItem("aId");
    } catch (error: any) {
      console.log("error", error);
      setIsLoading(false);
      const errorObject = JSON.parse(error.message);
      message.error(errorObject.message);
    }
  };

  return {
    stripeOnboardingReturn,
    isLoading,
  };
};

export default usePage;
