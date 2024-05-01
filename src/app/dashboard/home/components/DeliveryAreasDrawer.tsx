/** @format */

"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Checkbox, Drawer, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { CheckboxProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import Input from "@/components/auth/Input";
import useClickOutside from "@/hooks/useClickOutside";
import "react-phone-number-input/style.css";
import EyeOpenIcon from "@/components/svgs/EyeOpenIcon";
import EyeSlashIcon from "@/components/svgs/EyeSlashIcon";
import { days, times, regions } from "../data";
import TrashIcon from "@/components/svgs/TrashIcon";

interface ISupplierDetailsDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditing?: boolean;
}

interface IDeliveryDay {
  day: (typeof days)[number];
  cutOffDay: (typeof days)[number];
  cutOffTime: (typeof times)[number];
}

const DeliveryAreasDrawer = ({
  open,
  setOpen,
  isEditing = false,
}: ISupplierDetailsDrawer) => {
  const [selectedDeliveryDays, setSelectedDeliveryDays] = useState<
    IDeliveryDay[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRegions, setSelectedRegions] = useState<
    {
      region: string;
      areas: string[];
      hidden?: boolean;
    }[]
  >([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const searchResultsDivRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    setIsEditMode(isEditing);

    if (isEditing) {
      setSelectedDeliveryDays([
        {
          day: days[2],
          cutOffDay: days[0],
          cutOffTime: times[0],
        },
      ]);
      setSelectedRegions([
        {
          region: regions[0].region,
          areas: regions[0].areas,
          hidden: true,
        },
        {
          region: regions[3].region,
          areas: regions[3].areas,
          hidden: true,
        },
      ]);
    }
  }, [isEditing]);

  const handleDayClick = (day: (typeof days)[number]) => {
    if (selectedDeliveryDays.find((item) => item.day === day)) {
      setSelectedDeliveryDays((prevDays) =>
        prevDays.filter((item) => item.day !== day)
      );
      if (selectedDeliveryDays.length === 1) {
        setSelectedRegions([]);
      }
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

  const handleToggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.map((item) =>
        item.region === region
          ? {
              ...item,
              hidden: !item.hidden,
            }
          : item
      )
    );
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    setIsChecked(e.target.checked);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
              {isEditMode ? "Edit delivery details" : "Delivery details"}
            </h1>
            <p className="text-sm leading-6 font-poppins text-grey-2 mb-4">
              {isEditMode
                ? "Editing your delivery day to let customers know which days they can place orders for"
                : "Select your delivery days to let customers know which days they can place orders for"}
            </p>

            {!isEditMode && (
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
            )}

            {isEditMode || selectedDeliveryDays.length ? (
              <div className="my-8 mb-2">
                <h2 className="text-grey-2 text-xl font-gosha">
                  Selected delivery day
                </h2>
                {selectedDeliveryDays.map((deliveryDay, i) => (
                  <div
                    key={i}
                    className="my-4 flex items-center justify-between"
                  >
                    <div
                      className="flex items-center gap-2.5 text-grey-2 px-6 py-2.5 w-fit rounded-[100px] cursor-pointer bg-primary"
                      onClick={() =>
                        !isEditMode && handleDayClick(deliveryDay.day)
                      }
                    >
                      {!isEditMode && (
                        <CloseOutlined style={{ color: "#334054" }} />
                      )}
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
                                  setSelectedRegions((prev) => [
                                    ...prev,
                                    region,
                                  ]);
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

                <div className="max-h-[450px] overflow-y-scroll">
                  {selectedRegions.map((region, i) => {
                    const regionIndex = regions.findIndex(
                      (r) => r.region === region.region
                    );
                    return (
                      <div
                        key={i}
                        className="border-[1.5px] border-grey-4 rounded-[10px] p-2.5 mb-4"
                      >
                        <div
                          className={`flex items-center justify-between ${
                            region.hidden ? "" : "mb-3"
                          }`}
                        >
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
                              <p
                                className={`${
                                  isEditMode
                                    ? "flex gap-1 items-center cursor-pointer"
                                    : ""
                                } text-grey-2 text-base font-semibold`}
                                onClick={() => isEditMode && showModal()}
                              >
                                {isEditMode && (
                                  <CloseOutlined style={{ color: "#334054" }} />
                                )}
                                {region.region}
                              </p>
                              {!isEditMode &&
                                (region.areas.length ===
                                regions[regionIndex].areas.length ? (
                                  <p className="bg-primary rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm font-medium">
                                    All areas
                                  </p>
                                ) : (
                                  <p className="bg-[#eef4ff] rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm text-blue-1 font-medium">
                                    Some areas
                                  </p>
                                ))}
                              {isEditMode &&
                                (region.areas.length ===
                                regions[regionIndex].areas.length ? (
                                  <p
                                    onClick={() =>
                                      handleToggleRegion(region.region)
                                    }
                                    className={`${
                                      region.hidden
                                        ? "bg-white-1 text-grey-6"
                                        : "bg-primary text-grey-6"
                                    } flex gap-0.5 items-center cursor-pointer rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm font-medium`}
                                  >
                                    {region.hidden ? (
                                      <EyeOpenIcon color="#334054" />
                                    ) : (
                                      <EyeSlashIcon color="#334054" />
                                    )}
                                    All areas
                                  </p>
                                ) : (
                                  <p
                                    onClick={() =>
                                      handleToggleRegion(region.region)
                                    }
                                    className={`${
                                      region.hidden
                                        ? "bg-white-1 text-grey-6"
                                        : "bg-[#eef4ff] text-blue-1"
                                    } flex gap-0.5 items-center cursor-pointer rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5 text-sm font-medium`}
                                  >
                                    {region.hidden ? (
                                      <EyeOpenIcon color="#334054" />
                                    ) : (
                                      <EyeSlashIcon color="#0053F5" />
                                    )}
                                    Some areas
                                  </p>
                                ))}
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
                          {!region.hidden &&
                            region.areas.map((area, i) => (
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
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="py-10 z-[1]">
            <Button
              label={isEditMode ? "Save Changes" : "Add Delivery Areas"}
              className="text-2xl w-full"
              disabled={!selectedRegions || !selectedDeliveryDays}
              variant={
                !selectedRegions.length || !selectedDeliveryDays.length
                  ? "disabled"
                  : "primary"
              }
              onClick={() => {
                if (selectedRegions.length && selectedDeliveryDays.length) {
                  setOpen(false);
                  router.push("/dashboard/delivery-areas");
                }
              }}
            />
          </div>
        </div>
      </Drawer>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        className="custom-modal"
      >
        <h2 className="font-gosha text-2xl text-black w-[400px]">
          Are you sure you want to delete your delivery region?
        </h2>
        <div className="mt-2.5">
          <p className="text-grey-2 text-sm">
            Deleting your region will result in no further order with areas
            associated to this region. All the order might be cancelled and
            refunded to Rabble users.
          </p>
          <div className="flex items-center gap-2 bg-white-1 border-[1px] border-[#e2e6ec] rounded-[10px] p-2.5 w-full mt-6 mb-10">
            <div className="flex justify-between items-center gap-1">
              <Image
                src="/images/icons/location.svg"
                alt="location-icon"
                width={24}
                height={24}
              />
              <p className="text-base text-black font-semibold">Region</p>
            </div>
            <p className="rounded-[20px] border-[1px] border-[#e2e6ec] px-2 py-0.5">
              Greater London
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2.5">
          <Button
            label="Cancel"
            className="text-grey-2 bg-white-3"
            size="sm"
            onClick={handleCancel}
          />
          <Button
            label="Delete Region"
            className="text-white bg-danger"
            size="sm"
            onClick={handleCancel}
            icon={<TrashIcon color="#ffffff" />}
          />
        </div>
      </Modal>
    </>
  );
};

export default DeliveryAreasDrawer;
