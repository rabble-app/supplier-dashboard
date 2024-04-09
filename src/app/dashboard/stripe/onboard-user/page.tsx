/** @format */
"use client";
import { useSearchParams } from "next/navigation";

import Button from "@/components/Button";
import usePage from "./usePage";
import { Spin } from "antd";

const StripeOnboarding = () => {
  const { stripeOnboarding, isLoading } = usePage();
  const searchParams = useSearchParams();
  const sId = searchParams.get("sId");
  sId ? localStorage.setItem("sId", sId) : "";

  return (
    <div className="flex h-full w-full bg-[black] text-white font-normal font-poppins">
      <div className="flex flex-col items-center w-full justify-center">
        <h1 className="text-[30px]">
          Setup payouts to recieve payment from Rabble
        </h1>
        {isLoading ? <Spin size="large" className="custom-spin" /> : ""}
        <Button
          label="Connect with stripe"
          className="px-[10px] py-[15px] mt-5"
          onClick={stripeOnboarding}
        />
      </div>
    </div>
  );
};

export default StripeOnboarding;
