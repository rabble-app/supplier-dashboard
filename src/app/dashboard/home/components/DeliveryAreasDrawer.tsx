/** @format */

"use client";
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
} from "react";
import { Checkbox, Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { CheckboxProps } from "antd";
import Image from "next/image";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import Input from "@/components/auth/Input";
import useClickOutside from "@/hooks/useClickOutside";
import "react-phone-number-input/style.css";

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
  {
    region: "West Midlands",
    areas: [
      "Bromley - BR",
      "Croydon - CR",
      "Dartford - DA",
      "Enfield - EN",
      "Harlow - CM",
      "Harrow - HA",
    ],
  },
  {
    region: "East Midlands",
    areas: [
      "Bromley - BR",
      "Croydon - CR",
      "Dartford - DA",
      "Enfield - EN",
      "Harlow - CM",
      "Harrow - HA",
    ],
  },
  {
    region: "East of England",
    areas: [
      "Bromley - BR",
      "Croydon - CR",
      "Dartford - DA",
      "Enfield - EN",
      "Harlow - CM",
      "Harrow - HA",
    ],
  },
  {
    region: "London",
    areas: [
      "Bromley - BR",
      "Croydon - CR",
      "Dartford - DA",
      "Enfield - EN",
      "Harlow - CM",
      "Harrow - HA",
    ],
  },
  {
    region: "North East",
    areas: [
      "Bromley - BR",
      "Croydon - CR",
      "Dartford - DA",
      "Enfield - EN",
      "Harlow - CM",
      "Harrow - HA",
    ],
  },
  {
    region: "North West",
    areas: [
      "Bromley - BR",
      "Croydon - CR",
      "Dartford - DA",
      "Enfield - EN",
      "Harlow - CM",
      "Harrow - HA",
    ],
  },
  {
    region: "South East",
    areas: [
      "Bromley - BR",
      "Croydon - CR",
      "Dartford - DA",
      "Enfield - EN",
      "Harlow - CM",
      "Harrow - HA",
    ],
  },
  {
    region: "South West",
    areas: [
      "Bromley - BR",
      "Croydon - CR",
      "Dartford - DA",
      "Enfield - EN",
      "Harlow - CM",
      "Harrow - HA",
    ],
  },
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
  const [selectedRegions, setSelectedRegions] = useState<
    {
      region: string;
      areas: string[];
    }[]
  >([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);

  const searchResultsDivRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchResultsDivRef, () => {
    setSearchResultsOpen(false);
    setSearchValue("");
  });

  useEffect(() => {
    if (searchValue.length) {
      setSearchResultsOpen(true);
    } else {
      setSearchResultsOpen(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!selectedDeliveryDays.length) {
      setSelectedRegions([]);
    }
  }, [selectedDeliveryDays]);

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
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="font-gosha text-[32px] leading-10 mb-2">
            Delivery details
          </h1>
          <p className="text-sm leading-6 font-poppins text-grey-2 mb-4">
            Select your delivery days to let customers know which days they can
            place orders for
          </p>

          <div className="my-2 flex gap-4 flex-wrap mt-8">
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
                    className="flex items-center gap-2.5 text-grey-2 px-6 py-2.5 w-fit rounded-[100px] cursor-pointer bg-primary"
                    onClick={() => handleDayClick(deliveryDay.day)}
                  >
                    <CloseOutlined style={{ color: "#334054" }} />
                    <p className="text-base leading-6 font-semibold">
                      {deliveryDay.day}
                    </p>
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
              <div ref={searchResultsDivRef}>
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
                  onFocus={() => setSearchResultsOpen(true)}
                />
                {searchResultsOpen ? (
                  <ul className="bg-white-1 mt-3 border-grey-4 border-[1.2px] rounded-lg px-6 py-4 absolute w-full z-20 max-h-[260px] overflow-y-scroll">
                    {regions.map((region, i) => {
                      if (
                        region.region
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      ) {
                        const isRegionSelected = selectedRegions.some(
                          (selectedRegion) =>
                            selectedRegion.region === region.region
                        );

                        return (
                          <li
                            key={i}
                            className="cursor-pointer"
                            onClick={() => {
                              if (isRegionSelected) {
                                setSelectedRegions((prev) =>
                                  prev.filter(
                                    (item) => item.region !== region.region
                                  )
                                );
                              } else {
                                setSelectedRegions((prev) => [...prev, region]);
                              }
                            }}
                          >
                            <div className="flex justify-between items-center text-xl text-grey-2 ">
                              <p>{region.region}</p>
                              {isRegionSelected && (
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
            </div>
          ) : null}

          {selectedRegions.length && selectedDeliveryDays.length ? (
            <div className="my-8 relative">
              <h2 className="text-grey-2 text-xl font-gosha mb-2.5">
                Areas delivered to on &quot;selected.days&quot;
              </h2>
              <div className="flex gap-2 items-center justify-between custom-check mb-2.5">
                <Checkbox className="flex my-1" onChange={onChange}>
                  <p className="text-grey-2 text-base">
                    Use the same min for all Regions
                  </p>
                </Checkbox>

                {isChecked && (
                  <div className="flex items-center gap-3.5">
                    <p className="text-sm text-grey-2 font-medium">Min Order</p>
                    <div className="bg-grey-1 rounded-lg text-sm px-4 py-1 flex items-center gap-3">
                      <p className="text-grey-6 font-medium">£</p>
                      <input
                        className="w-14 text-base text-right bg-grey-1 pr-2 outline-none"
                        type="number"
                        placeholder="0.00"
                        step=".01"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="max-h-[450px] overflow-y-scroll">
                {selectedRegions.map((region, i) => (
                  <div
                    key={i}
                    className="border-[1.5px] border-grey-4 rounded-[10px] p-2.5 mb-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex justify-between items-center gap-4 bg-white-1 border-[1px] border-[#e2e6ec] rounded-[10px] p-2.5 w-fit">
                        <div className="flex justify-between items-center gap-1">
                          <Image
                            src="/images/icons/location.svg"
                            alt="location-icon"
                            width={24}
                            height={24}
                          />
                          <p className="text-base text-black font-semibold">
                            Region
                          </p>
                        </div>
                        <div className="flex justify-between items-center gap-1 pl-2 pr-0.5 py-0.5 border-[1px] border-[#e2e6ec] rounded-[20px]">
                          <p className="text-grey-2 text-base font-semibold">
                            {region.region}
                          </p>
                          {region.areas.length === regions[i].areas.length ? (
                            <p className="bg-primary rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm font-medium">
                              All areas
                            </p>
                          ) : (
                            <p className="bg-[#eef4ff] rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm text-blue-1 font-medium">
                              Some areas
                            </p>
                          )}
                        </div>
                      </div>

                      {!isChecked && (
                        <div className="flex items-center gap-3.5">
                          <p className="text-sm text-grey-2 font-medium">
                            Min Order
                          </p>
                          <div className="bg-grey-1 rounded-lg text-sm px-4 py-1 flex items-center gap-3">
                            <p className="text-grey-6 font-medium">£</p>
                            <input
                              className="w-14 text-base text-right bg-grey-1 pr-2 outline-none"
                              type="number"
                              placeholder="0.00"
                              step=".01"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {region.areas.map((area, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1 text-grey-6 px-2 w-fit rounded-[20px] cursor-pointer bg-primary"
                          onClick={() => {
                            if (region.areas.length !== 1) {
                              setSelectedRegions((prev) =>
                                prev.map((item) =>
                                  item.region === region.region
                                    ? {
                                        ...item,
                                        areas: item.areas.filter(
                                          (a) => a !== area
                                        ),
                                      }
                                    : item
                                )
                              );
                            } else {
                              setSelectedRegions((prev) =>
                                prev.filter(
                                  (item) => item.region !== region.region
                                )
                              );
                            }
                          }}
                        >
                          <CloseOutlined style={{ color: "#334054" }} />
                          <p className="text-sm font-medium leading-5">
                            {area}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="py-10 z-[1]">
          <Button
            label="Add Delivery Areas"
            className="text-2xl w-full"
            disabled={!selectedRegions && !selectedDeliveryDays}
            variant={
              !selectedRegions.length || !selectedDeliveryDays.length ? "disabled" : "primary"
            }
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default DeliveryAreasDrawer;
