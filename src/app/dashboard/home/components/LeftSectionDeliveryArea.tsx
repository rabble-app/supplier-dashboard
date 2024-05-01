/** @format */

import Image from "next/image";

const LeftSectionDeliveryArea = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="p-4 flex justify-between items-center bg-white rounded-lg shadow-custom-2">
      <div className="flex gap-4 items-center">
        <div className="rounded-full h-12 w-12 bg-white-3 flex justify-center items-center">
          <Image
            src="/images/icons/truck.svg"
            width={24}
            height={24}
            alt="truck"
          />
        </div>
        <h2 className="text-black text-base font-gosha font-bold">
          Delivery Areas
        </h2>
      </div>
      <button
        className="w-16 h-12 rounded-[100px] bg-black flex justify-center items-center cursor-pointer"
        onClick={onClick}
      >
        <Image
          src="/images/icons/arrow-right.svg"
          width={32}
          height={32}
          alt="arrow-right"
        />
      </button>
    </div>
  );
};

export default LeftSectionDeliveryArea;
