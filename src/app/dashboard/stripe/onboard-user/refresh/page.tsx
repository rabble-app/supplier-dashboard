/** @format */
"use client";

import usePage from "./usePage";
import { useEffect } from "react";
import { Spin } from "antd";

const RefreshOnboarding = () => {
  const { stripeOnboardingRefresh, isLoading } = usePage();
  useEffect(() => {
    stripeOnboardingRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex bg-white w-full">
      {isLoading && (
        <div className="flex flex-col items-center w-full justify-center mt-[15%]">
          <Spin size="large" className="custom-spin" />
          <h1 className="text-[30px] text-black mb-2 font-gosha">
            Redirecting to{" "}
            {localStorage.getItem("aId") ? "your stripe onboarding" : "Rabble"}
          </h1>
        </div>
      )}
    </div>
  );
};

export default RefreshOnboarding;
