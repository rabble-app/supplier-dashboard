/** @format */
"use client";

import usePage from "./usePage";
import { useEffect } from "react";
import { Spin } from "antd";

const RefreshOnboarding = () => {
  const { stripeOnboardingRefresh, isLoading } = usePage();
  useEffect(()=>{
    stripeOnboardingRefresh()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="flex h-full w-full bg-[black] text-white font-normal font-poppins">
      <div className="flex flex-col items-center w-full justify-center">
        <h1 className="text-[30px]">
         You will shortly be redirected to complete your stripe onboarding
        </h1>
        {isLoading ? <Spin size="large" className="custom-spin" /> : ""}
      </div>
    </div>
  );
};

export default RefreshOnboarding;
