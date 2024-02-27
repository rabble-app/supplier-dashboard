/** @format */

"use client";

import Image from "next/image";

import LeftSectionDeliveryArea from "./LeftSectionDeliveryArea";
import TeamDetailsHeading from "./TeamDetailsHeading";
import TeamDetailsInfo from "./TeamDetailsInfo";

const LeftSection = ({ onClick }: { onClick: () => void }) => {
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
            title="Farm2Door"
            subtitle="Fruits and Vegetables"
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
            subtitle="Providing a diverse range of locally sourced, farm-fresh fruits and vegetables to fulfill all your culinary needs."
          />
          <TeamDetailsInfo
            title="Business address"
            subtitle="street 17, Nottingham"
          />
          <TeamDetailsInfo
            title="Business phone number"
            subtitle="+44-3012789002"
          />
          <TeamDetailsInfo
            title="Business website"
            subtitle="https://www.farm2door.com"
          />
        </div>
      </div>

      <LeftSectionDeliveryArea />
    </div>
  );
};

export default LeftSection;
