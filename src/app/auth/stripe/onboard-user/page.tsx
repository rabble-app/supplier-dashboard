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
  const partnerId = searchParams.get("partnerId");
  sId ? localStorage.setItem("sId", sId) : "";
  partnerId ? localStorage.setItem("partnerId", partnerId) : "";

  const partnerIdExists = partnerId ? true : false;

  return (
    <div className="flex h-full w-full bg-[black] text-white font-normal font-poppins">
      <div className="flex flex-col items-center w-full justify-center">
        <h1 className="text-[30px]">
          Setup payouts to receive payment from Rabble
        </h1>
        {isLoading ? <Spin size="large" className="custom-spin" /> : ""}
        <Button
          label="Connect with stripe"
          className="px-[10px] py-[15px] mt-5"
          onClick={() => stripeOnboarding(partnerIdExists)}
        />
      </div>
    </div>
  );
};

export default StripeOnboarding;
