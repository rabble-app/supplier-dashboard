/** @format */
"use client";

import usePage from "./usePage";
import { useEffect } from "react";
import { Spin } from "antd";

const OnboardingSuccess = () => {
  const { stripeOnboardingSuccess, isLoading } = usePage();
  useEffect(()=>{
    stripeOnboardingSuccess()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="flex h-full w-full bg-[black] text-white font-normal font-poppins">
      <div className="flex flex-col items-center w-full justify-center">
        <h1 className="text-[30px]">
         You have completed your stripe onboarding
        </h1>
        {isLoading ? <Spin size="large" className="custom-spin" /> : ""}
      </div>
    </div>
  );
};

export default OnboardingSuccess;
