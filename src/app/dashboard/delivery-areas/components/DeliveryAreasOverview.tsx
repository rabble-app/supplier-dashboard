/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import BackButton from "@/components/BackButton";
import DeliveryAreasDrawer from "../../home/components/DeliveryAreasDrawer";
import { handleGetDeliveryDays } from "../api";
import { capitalizeFirstLetter, formatAmount } from "@/utils";


const DeliveryAreasOverview = () => {
  const [openDeliveryAreasDrawer, setOpenDeliveryAreasDrawer] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(`${searchParams}`);

  const selectedDeliveryDayId = params.get("id");

  const {
    data: deliveryDaysData,
    isFetching: isFetchingDeliveryDays,
    isError: isDeliveryDaysError,
  } = useQuery({
    queryKey: ["delivery-days"],
    queryFn: () => handleGetDeliveryDays(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (selectedDeliveryDayId && !isDeliveryDaysError) {
      setOpenDeliveryAreasDrawer(true);
      setIsEditing(true);
    }
  }, [selectedDeliveryDayId, isDeliveryDaysError]);

  if (isDeliveryDaysError) return <div>Error...</div>;

  const handleEditClicked = (day: any)=> {
    setIsEditing(true);
    params.set("id", day.id);
    
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  console.log(2, deliveryDaysData)

  return (
    <>
      {isFetchingDeliveryDays ? (
        <span className="flex justify-center items-center h-screen">
          <Spin className="custom-spin mr-1" />
          &nbsp;Loading delivery days...
        </span>
      ) : (
        <div className="pt-8 relative">
          <BackButton />
          <div className="flex justify-between items-center mt-5 mb-9">
            <PageHeader
              title="Delivery Areas"
              subtitle="Select your area radius for delivery days and cut off time."
            />
            {deliveryDaysData?.length < 7 && (
              <Button
                onClick={() => {
                  setOpenDeliveryAreasDrawer(true);
                  setIsEditing(false);
                }}
                label="Add a New Delivery Day"
                size="md"
              />
            )}
          </div>
          <h2 className="text-black font-gosha text-xl">Set Delivery Days</h2>
          {deliveryDaysData.length === 0 && (
            <h3 className="mt-10 text-grey-5">No Data available.</h3>
          )}
          {deliveryDaysData?.map((day: any, i: number) => (
            <div key={day.day} className="mt-5">
              <PageWrapper mt={20}>
                <div className="bg-grey-2 rounded-lg px-2.5 py-2 w-[384px] flex justify-between items-center mx-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <Image
                        src="/images/icons/calendar.svg"
                        width={16}
                        height={16}
                        alt="calendar"
                      />
                      <h3 className="text-primary font-semibold text-sm capitalize">
                        {day.day.toLowerCase()}
                      </h3>
                    </div>
                    <p className="text-primary-light-2 text-xs font-medium">
                      CO Time {capitalizeFirstLetter(day.cutOffDay?.toLowerCase())} {day.cutOffTime}
                    </p>
                  </div>
                  <button
                    className="rounded-full bg-white-3 flex justify-center items-center w-10 h-8 cursor-pointer"
                    onClick={() => handleEditClicked(day)}
                  >
                    <Image
                      src="/images/icons/edit.svg"
                      width={24}
                      height={24}
                      alt="edit"
                    />
                  </button>
                </div>
                <hr className="my-4 border-0 border-t-[1.2px] border-grey-4" />
                <div className="mx-4 mb-4 flex justify-start items-center gap-4 bg-white-1 border-[1px] border-[#e2e6ec] rounded-[10px] px-2.5 py-4 w-fit shadow-custom-1">
                  <div className="flex justify-between items-center gap-1">
                    <Image
                      src="/images/icons/location.svg"
                      alt="location-icon"
                      width={24}
                      height={24}
                    />
                    <p className="text-base text-black font-semibold">
                      Regions
                    </p>
                  </div>
                  {day.regions.map((region: any, i: number) => (
                    <div
                      key={region.id}
                      className="flex justify-between items-center gap-2 px-4 py-2 border-[1px] border-[#e2e6ec] rounded-[100px]"
                    >
                      <p className="text-grey-2 text-base font-semibold">
                        {region.region.name}
                      </p>
                      <p className="bg-white-3 rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm font-medium shadow-custom-1 text-grey-2">
                        Min Order {formatAmount(region.minimumOrder)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mx-4 mb-4 flex gap-4 items-start bg-white-1 border-[1px] border-[#e2e6ec] rounded-[10px] px-2.5 py-4 w-fit shadow-custom-1">
                  <div className="flex justify-between items-center gap-1">
                    <Image
                      src="/images/icons/location.svg"
                      alt="location-icon"
                      width={24}
                      height={24}
                    />
                    <p className="text-base text-black font-semibold mr-5">Areas</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {day.areas.map((area: any, i: number) => (
                      <p
                        key={`${area.id}`}
                        className="text-grey-2 text-base font-semibold px-2 py-0.5 border-[1.2px] border-[#e2e6ec] shadow-custom-1 rounded-[20px]"
                      >
                        {`${area.area.name} - ${area.area.code}`}
                      </p>
                    ))}
                  </div>
                </div>
              </PageWrapper>
            </div>
          ))}
          <div className="mb-10" />
        </div>
      )}
      <DeliveryAreasDrawer
        open={openDeliveryAreasDrawer}
        setOpen={setOpenDeliveryAreasDrawer}
        isEditing={isEditing}
        deliveryDaysData={deliveryDaysData}
        // key={crypto.randomUUID()}
      />
    </>
  );
};

export default DeliveryAreasOverview;
