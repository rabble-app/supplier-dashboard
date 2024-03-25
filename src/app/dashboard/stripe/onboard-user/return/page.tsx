/** @format */
"use client";

import usePage from "./usePage";
import { useEffect } from "react";
import { Spin } from "antd";

const OnboardingReturn = () => {
  const { stripeOnboardingReturn, isLoading } = usePage();
  useEffect(() => {
    stripeOnboardingReturn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full bg-white">
      {isLoading && (
        <div className="flex flex-col items-center w-full justify-center mt-[15%]">
          <Spin size="large" className="custom-spin" />
          <h1 className="text-[30px] text-black mb-2 font-gosha">
            Please wait...
          </h1>
        </div>
      )}
    </div>
  );
};

export default OnboardingReturn;
