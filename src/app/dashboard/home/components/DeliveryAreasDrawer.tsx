/** @format */

"use client";
import { useState, useEffect, useRef, ChangeEvent, useMemo } from "react";
import { Checkbox, Drawer, Spin, message } from "antd";
import type { CheckboxProps } from "antd";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import Input from "@/components/auth/Input";
import PhoneNumberInput from "@/components/PhoneInput";
import Select from "@/components/Select";
import "react-phone-number-input/style.css";
import { handleUploadProducerImage } from "../api";
import EditIcon from "@/components/svgs/EditIcon";
import SearchInput from "@/components/SearchInput";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const times = [
  "0:00",
  "1:00",
  "2:00",
  "3:00",
  "4:00",
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const regions = [
  "West Midlands",
  "East Midlands",
  "North West",
  "North East",
  "South West",
  "South East",
  "London",
  "East of England",
  "Yorkshire and the Humber",
  "Scotland",
  "Wales",
  "Northern Ireland",
  "Isle of Man",
  "Channel Islands",
];

interface ISupplierDetailsDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface IDeliveryDay {
  day: (typeof days)[number];
  cutOffDay: (typeof days)[number];
  cutOffTime: (typeof times)[number];
}

const DeliveryAreasDrawer = ({ open, setOpen }: ISupplierDetailsDrawer) => {
  const [selectedDeliveryDays, setSelectedDeliveryDays] = useState<
    IDeliveryDay[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleDayClick = (day: (typeof days)[number]) => {
    if (selectedDeliveryDays.find((item) => item.day === day)) {
      setSelectedDeliveryDays((prevDays) =>
        prevDays.filter((item) => item.day !== day)
      );
    } else {
      setSelectedDeliveryDays((prevDays) => [
        ...prevDays,
        {
          day,
          cutOffDay: days[0],
          cutOffTime: times[0],
        },
      ]);
    }
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    setIsChecked(e.target.checked);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      closeIcon={<CloseButton className="absolute right-5 top-5" />}
      placement="right"
      onClose={onClose}
      open={open}
      width={650}
      className="relative px-5 pt-14 custom-drawer"
    >
      <div className="overflow-y-scroll">
        <h1 className="font-gosha text-[32px] leading-10 mb-2">
          Delivery details
        </h1>
        <p className="text-sm leading-6 font-poppins text-grey-2 mb-4">
          Select your delivery days to let customers know which days they can
          place orders for
        </p>

        <div className="my-2 flex gap-4 flex-wrap">
          {days.map((day, i) => {
            if (!selectedDeliveryDays.find((item) => item.day === day))
              return (
                <div
                  key={i}
                  className="text-grey-2 text-base leading-6 px-6 py-2.5 bg-grey-1 w-fit rounded-[100px] cursor-pointer font-medium"
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              );
          })}
        </div>

        {selectedDeliveryDays.length ? (
          <div className="my-8 mb-2">
            <h2 className="text-grey-2 text-xl font-gosha">
              Selected delivery day
            </h2>
            {selectedDeliveryDays.map((deliveryDay, i) => (
              <div key={i} className="my-4 flex items-center justify-between">
                <div
                  className="text-grey-2 text-base leading-6 px-6 py-2.5 w-fit rounded-[100px] cursor-pointer bg-primary font-semibold"
                  onClick={() => handleDayClick(deliveryDay.day)}
                >
                  {deliveryDay.day}
                </div>
                <div className="flex gap-2 items-center">
                  <p>Cut off time:</p>
                  <div className="bg-grey-1 pr-2 rounded-lg cursor-pointer">
                    <select className="text-grey-6 font-medium bg-grey-1 rounded-lg py-1 pl-4 -pr-2 focus:outline-none cursor-pointer">
                      {days.map((day, i) => (
                        <option key={i}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-grey-1 pr-2 rounded-lg cursor-pointer">
                    <select className="text-grey-6 font-medium bg-grey-1 rounded-lg py-1 pl-4 -pr-2 focus:outline-none cursor-pointer">
                      {times.map((time, i) => (
                        <option key={i}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {selectedDeliveryDays.length ? (
          <div className="my-8 mb-2 relative z-[9999]">
            <h2 className="text-grey-2 text-xl font-gosha mb-4">
              Search your delivery regions or areas
            </h2>
            <Input
              label="Delivery Regions or Areas"
              placeholder="Search your regions or areas"
              id="delivery_areas"
              type="text"
              leftIcon="/images/icons/search.svg"
              value={searchValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
            />
            {searchValue ? (
              <ul className="bg-white-1 mt-3 border-grey-4 border-[1.2px] rounded-lg px-6 py-4 ">
                {regions.map((region, i) => {
                  if (
                    region.toLowerCase().includes(searchValue.toLowerCase())
                  ) {
                    const isSelected = selectedRegions.includes(region);

                    return (
                      <li
                        key={i}
                        className="cursor-pointer"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedRegions((prev) =>
                              prev.filter((item) => item !== region)
                            );
                          } else {
                            setSelectedRegions((prev) => [...prev, region]);
                          }
                          setSearchValue("");
                        }}
                      >
                        <div className="flex justify-between items-center text-xl text-grey-2 ">
                          <p>{region}</p>
                          {selectedRegions.includes(region) && (
                            <div className="bg-black w-5 h-5 rounded-full flex justify-center items-center">
                              <Image
                                src="/images/icons/check.svg"
                                alt="check"
                                width={8.5}
                                height={5.6}
                              />
                            </div>
                          )}
                        </div>
                        <hr className="my-2.5 border-0 border-t-[1.5px] border-grey-4" />
                      </li>
                    );
                  }
                })}
              </ul>
            ) : null}
          </div>
        ) : null}

        {selectedRegions.length ? (
          <div className="my-8 mb-2 relative z-[9999]">
            <h2 className="text-grey-2 text-xl font-gosha mb-2.5">
              Areas delivered to on &quot;selected.days&quot;
            </h2>
            <div className="flex gap-2 items-center justify-between custom-check">
              <Checkbox className="flex" onChange={onChange}>
                <p className="text-grey-2 text-base">
                  Use the same min for all Regions
                </p>
              </Checkbox>

              <div className="flex items-center gap-3.5">
                <p className="text-sm text-grey-2">Min Order</p>
                <input className="" type="text" />
              </div>
            </div>
          </div>
        ) : null}

        <div className="mb-10 absolute bottom-0 left-5 right-5 z-[1]">
          <Button
            label="Add Delivery Areas"
            className="text-2xl w-full"
            disabled={true}
            variant="disabled"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default DeliveryAreasDrawer;
