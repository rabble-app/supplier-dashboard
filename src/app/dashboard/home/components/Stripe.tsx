/** @format */

import Image from "next/image";
import Button from "@/components/Button";
import { Spin } from "antd";

interface IStripe {
  handleStripeOnboarding: (x:boolean) => void;
  isLoading: boolean;
}

const Stripe = ({ handleStripeOnboarding, isLoading }: IStripe) => {
  return (
    <div className="flex flex-col justify-center items-center pt-[12%]">
      <Image
        src="/images/icons/stripe.svg"
        width={100}
        height={42}
        className="mb-6"
        alt="stripe"
      />
      <h1 className="text-[32px] text-grey-6 font-gosha mb-2">
        Connect Your Stripe Account
      </h1>
      <p className="text-grey-5 text-sm w-[534px] mb-10">
        Welcome to Rabble! To start receiving payments and unlock the full 
        potential of your Rabble account, you need to connect your Stripe
        account. This secure connection ensures hassle-free payouts.
      </p>
      <Button
        label={isLoading ?  <Spin /> :"Connect Stripe"}
        className="w-[400px] h-[60px] !text-base"
        onClick={handleStripeOnboarding}
      />
    </div>
  );
};

export default Stripe;
