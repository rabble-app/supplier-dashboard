/** @format */
"use client";

import { message } from "antd";
import { useRouter } from "next/navigation";

import {
  handleProducerRecordUpdate,
  handleGetStripeConnectAccountInfo,
  handlePartnerRecordUpdate,
} from "@/actions/authActions";
import { useState } from "react";

const usePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const stripeOnboardingSuccess = async () => {
    try {
      setIsLoading(true);
      const supplierId = localStorage.getItem("sId");
      const accountId = localStorage.getItem("aId");
      const partnerId = localStorage.getItem("partnerId");

      if (accountId) {

        let result = await handleGetStripeConnectAccountInfo(accountId);
        if (supplierId) {
          // check that charges are enabled in the user's stripe account
          if (result) {
            result = await handleProducerRecordUpdate(supplierId, accountId);
          } else {
            push("/auth/stripe/onboard-user/refresh");
          }
          if (result.error) {
            throw new Error(JSON.stringify(result));
          }
        } else if (partnerId) {
          // check that charges are enabled in the user's stripe account
          if (result) {
            result = await handlePartnerRecordUpdate(partnerId, accountId);
          } else {
            push("/auth/stripe/onboard-user/refresh");
          }
          if (result.error) {
            throw new Error(JSON.stringify(result));
          }
        }
      }
      setIsLoading(false);
      localStorage.removeItem("sId");
      localStorage.removeItem("partnerId");
      localStorage.removeItem("aId");
    } catch (error: any) {
      setIsLoading(false);
      const errorObject = JSON.parse(error.message);
      message.error(errorObject.message);
    }
  };

  return {
    stripeOnboardingSuccess,
    isLoading,
  };
};

export default usePage;
