/** @format */

"use client";
import React, { useState } from "react";

import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import DeliveryAreasDrawer from "../../home/components/DeliveryAreasDrawer";
import { days, regions } from "../../home/data";

const DeliveryAreasOverview = () => {
  const [openDeliveryAreasDrawer, setOpenDeliveryAreasDrawer] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      <div className="pt-8 relative">
        <BackButton />
        <div className="flex justify-between items-center mt-5 mb-9">
          <PageHeader
            title="Delivery Areas"
            subtitle="Select your area radius for delivery days and cut off time."
          />
          <Button
            onClick={() => {
              setOpenDeliveryAreasDrawer(true);
              setIsEditing(false);
            }}
            label="Add a New Delivery Day"
            size="md"
          />
        </div>
        <h2 className="text-black font-gosha text-xl">Set Delivery Days</h2>
        {days
          .filter((day) => ["Wednesday", "Saturday"].includes(day))
          .map((day, i) => (
            <PageWrapper key={i} mt={20}>
              <div className="bg-grey-2 rounded-lg px-2.5 py-2 w-[384px] flex justify-between items-center mx-4">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <Image
                      src="/images/icons/calendar.svg"
                      width={16}
                      height={16}
                      alt="calendar"
                    />
                    <h3 className="text-primary font-semibold text-sm">
                      {day}
                    </h3>
                  </div>
                  <p className="text-primary-light-2 text-xs font-medium">
                    CO Time Saturday 21:00
                  </p>
                </div>
                <div
                  className="rounded-full bg-white-3 flex justify-center items-center w-10 h-8 cursor-pointer"
                  onClick={() => {
                    setOpenDeliveryAreasDrawer(true);
                    setIsEditing(true);
                  }}
                >
                  <Image
                    src="/images/icons/edit.svg"
                    width={24}
                    height={24}
                    alt="edit"
                  />
                </div>
              </div>
              <hr className="my-4 border-0 border-t-[1.2px] border-grey-4" />
              <div className="mx-4 mb-4 flex justify-between items-center gap-4 bg-white-1 border-[1px] border-[#e2e6ec] rounded-[10px] px-2.5 py-4 w-fit shadow-custom-1">
                <div className="flex justify-between items-center gap-1">
                  <Image
                    src="/images/icons/location.svg"
                    alt="location-icon"
                    width={24}
                    height={24}
                  />
                  <p className="text-base text-black font-semibold">Regions</p>
                </div>
                <div className="flex justify-between items-center gap-2 px-4 py-2 border-[1px] border-[#e2e6ec] rounded-[100px]">
                  <p className="text-grey-2 text-base font-semibold">
                    Greater London
                  </p>
                  <p className="bg-white-3 rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm font-medium shadow-custom-1 text-grey-2">
                    Min Order £95.00
                  </p>
                </div>
                <div className="flex justify-between items-center gap-2 px-4 py-2 border-[1px] border-[#e2e6ec] rounded-[100px]">
                  <p className="text-grey-2 text-base font-semibold">
                    Central London
                  </p>
                  <p className="bg-white-3 rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm font-medium shadow-custom-1 text-grey-2">
                    Min Order £95.00
                  </p>
                </div>
              </div>
              <div className="mx-4 mb-4 flex gap-4 items-start bg-white-1 border-[1px] border-[#e2e6ec] rounded-[10px] px-2.5 py-4 w-fit shadow-custom-1">
                <div className="flex justify-between items-center gap-1">
                  <Image
                    src="/images/icons/location.svg"
                    alt="location-icon"
                    width={24}
                    height={24}
                  />
                  <p className="text-base text-black font-semibold">Areas</p>
                </div>
                <div className="flex flex-wrap gap-1 w-[80%]">
                  {regions[2].areas.map((area, i) => (
                    <p
                      key={i}
                      className="text-grey-2 text-base font-semibold px-2 py-0.5 border-[1.2px] border-[#e2e6ec] shadow-custom-1 rounded-[20px]"
                    >
                      {area}
                    </p>
                  ))}
                </div>
              </div>
            </PageWrapper>
          ))}
        <div className="mb-10" />
      </div>
      <DeliveryAreasDrawer
        open={openDeliveryAreasDrawer}
        setOpen={setOpenDeliveryAreasDrawer}
        isEditing={isEditing}
        // key={crypto.randomUUID()}
      />
    </>
  );
};

export default DeliveryAreasOverview;
