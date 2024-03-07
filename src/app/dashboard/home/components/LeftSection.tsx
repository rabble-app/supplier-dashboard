/** @format */

"use client";

import Image from "next/image";

import LeftSectionDeliveryArea from "./LeftSectionDeliveryArea";
import TeamDetailsHeading from "./TeamDetailsHeading";
import TeamDetailsInfo from "./TeamDetailsInfo";

const LeftSection = ({ onClick, producerData }: { onClick: () => void, producerData:any }) => {
  return (
    <div className="py-10 mb-4 ">
      <div className="w-[400px] rounded-lg bg-white p-2.5 mb-2.5 shadow-custom-2">
        <div className="h-[180px] bg-grey-1 rounded-lg flex justify-center cursor-pointer">
          <Image
            src="/images/icons/picture-rectangle.svg"
            width={96}
            height={96}
            alt="no-image"
          />
        </div>
        <div className="my-4 flex flex-col">
          <TeamDetailsHeading
            title={producerData?.businessName}
            subtitle={producerData?.categories?.[0]?.category?.name}
            rightIcon={
              <div
                className="rounded-full bg-white-3 flex justify-center items-center w-12 h-12 cursor-pointer"
                onClick={onClick}
              >
                <Image
                  src="/images/icons/edit.svg"
                  width={24}
                  height={24}
                  alt="edit"
                />
              </div>
            }
          />
          <TeamDetailsInfo
            title="Business description"
            subtitle={producerData?.description||"N/A"}
          />
          <TeamDetailsInfo
            title="Business address"
            subtitle={producerData?.businessAddress}
          />
          <TeamDetailsInfo
            title="Business phone number"
            subtitle={`+44${producerData?.user?.phone}`||"N/A"}
          />
          <TeamDetailsInfo
            title="Business website"
            subtitle={producerData?.website||"N/A"}
          />
        </div>
      </div>

      <LeftSectionDeliveryArea />
    </div>
  );
};

export default LeftSection;