/** @format */

import Image from "next/image";

const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-[12%]">
      <Image
        src="/images/Orders.png"
        width={393}
        height={236}
        className="mb-8"
        alt="stripe"
      />
      <h2 className="font-gosha text-[32px] font-bold text-grey-6 mb-2">
        No upcoming orders
      </h2>
      <p className="text-grey-5 font-normal text-sm">
        It seems that you currently don&apos;t have any upcoming orders.
      </p>
    </div>
  );
};

export default NoData;
