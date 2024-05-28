/** @format */

"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Checkbox, Drawer, Modal, Spin, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { CheckboxProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import Input from "@/components/auth/Input";
import useClickOutside from "@/hooks/useClickOutside";
import "react-phone-number-input/style.css";
import EyeOpenIcon from "@/components/svgs/EyeOpenIcon";
import EyeSlashIcon from "@/components/svgs/EyeSlashIcon";
import { days, times, regions } from "../data";
import TrashIcon from "@/components/svgs/TrashIcon";
import {
  handleSearchRegionsOrAreas,
  useAddDeliveryDays,
} from "../../delivery-areas/api";

interface ISupplierDetailsDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditing?: boolean;
  deliveryDay?: any;
  deliveryDaysData?: any;
}

interface IDeliveryDay {
  day: (typeof days)[number];
  cutOffDay: (typeof days)[number];
  cutOffTime: (typeof times)[number];
}

export interface Region {
  id: string;
  name: string;
  postalCodeArea: { id: string; name: string }[];
}

interface SelectedRegion extends Region {
  minOrder?: string;
  hidden?: boolean;
  originalAreasLength?: number;
}

const DeliveryAreasDrawer = ({
  open,
  setOpen,
  isEditing = false,
  deliveryDay,
  deliveryDaysData,
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
  const [selectedRegions1, setSelectedRegions1] = useState<SelectedRegion[]>(
    []
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const searchResultsDivRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const usedDays = deliveryDaysData?.map((day: any) => day.day) ?? [];

  const { mutate: addDeliveryDays, isPending: isSubmittingDeliveryDays } =
    useAddDeliveryDays();

  const { data: searchResultsData, isFetching: isFetchingSearchResults } =
    useQuery({
      queryKey: ["search-results", searchValue],
      queryFn: () => handleSearchRegionsOrAreas(searchValue),
      enabled: searchValue.length > 1,
      refetchOnWindowFocus: false,
    });

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

  // useEffect(() => {
  //   setIsEditMode(true);

  //   // if (isEditing) {
  //     // const { cutOffDay, cutOffTime, day } = deliveryDay;
  //     setSelectedDeliveryDays([
  //       {
  //         day:"Tuesday",
  //         cutOffDay:"Sunday",
  //         cutOffTime:"9:00",
  //       },
  //     ]);
  //     setSelectedRegions([
  //       {
  //         region: regions[0].region,
  //         areas: regions[0].areas,
  //         hidden: true,
  //       },
  //       {
  //         region: regions[3].region,
  //         areas: regions[3].areas,
  //         hidden: true,
  //       },
  //     ]);
  //   // }
  // }, []);

  const handleDayClick = (day: (typeof days)[number]) => {
    if (selectedDeliveryDays.find((item) => item.day === day)) {
      setSelectedDeliveryDays((prevDays) =>
        prevDays.filter((item) => item.day !== day)
      );
      if (selectedDeliveryDays.length === 1) {
        setSelectedRegions1([]);
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

  const handleCutOffChange = (
    type: "day" | "time",
    deliveryDay: IDeliveryDay,
    value: string
  ) => {
    setSelectedDeliveryDays((prevDays) => {
      return prevDays.map((item) => {
        if (item.day === deliveryDay.day) {
          if (type === "day") {
            return { ...item, cutOffDay: value };
          } else if (type === "time") {
            return { ...item, cutOffTime: value };
          }
        }
        return item;
      });
    });
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

  const handleUpdateRegion = (
    region: { areas: string[]; region: string },
    area: string
  ) => {
    const filteredAreas = (areas: string[]) => areas.filter((a) => a !== area);
    if (region.areas.length !== 1) {
      setSelectedRegions((prev) =>
        prev.map((item) =>
          item.region === region.region
            ? {
                ...item,
                areas: filteredAreas(item.areas),
              }
            : item
        )
      );
    } else {
      setSelectedRegions((prev) =>
        prev.filter((item) => item.region !== region.region)
      );
    }
  };

  const handleUpdateRegionSearched = (
    isRegionSelected: boolean,
    region: { areas: string[]; region: string }
  ) => {
    if (isRegionSelected) {
      setSelectedRegions((prev) =>
        prev.filter((item) => item.region !== region.region)
      );
    } else {
      setSelectedRegions((prev) => [...prev, region]);
    }
  };

  const handleUpdateRegion1 = (
    type: "minOrder" | "area" | "genMinOrder",
    region: Region | undefined,
    value: string
  ) => {
    const filteredAreas = (areas: { id: string; name: string }[]) =>
      areas.filter((a) => a.name !== value);
    if (type === "area") {
      if (region?.postalCodeArea.length !== 1) {
        setSelectedRegions1((prev) =>
          prev.map((item) =>
            item.id === region?.id
              ? {
                  ...item,
                  postalCodeArea: filteredAreas(item.postalCodeArea),
                }
              : item
          )
        );
      } else {
        setSelectedRegions1((prev) =>
          prev.filter((item) => item.id !== region.id)
        );
      }
    } else if (type === "minOrder") {
      setSelectedRegions1((prev) =>
        prev.map((item) =>
          item.id === region?.id
            ? {
                ...item,
                minOrder: value,
              }
            : item
        )
      );
    } else if (type === "genMinOrder") {
      setSelectedRegions1((prev) =>
        prev.map((item) => ({ ...item, minOrder: value }))
      );
    }
  };

  const handleUpdateRegionSearched1 = (
    isRegionSelected: boolean,
    region: Region
  ) => {
    if (isRegionSelected) {
      setSelectedRegions1((prev) =>
        prev.filter((item) => item.id !== region.id)
      );
    } else {
      setSelectedRegions1((prev) => [
        ...prev,
        { ...region, originalAreasLength: region.postalCodeArea.length },
      ]);
    }
  };

  const isReadyToSubmit = () => {
    const checkMinOrder = selectedRegions1.every((region) => region.minOrder);
    return (
      selectedRegions1.length > 0 &&
      checkMinOrder &&
      selectedDeliveryDays.length > 0
    );
  };

  const preparedData = () => ({
    days: selectedDeliveryDays.map((day) => ({
      name: day.day.toUpperCase(),
      cutOffDay: day.cutOffDay.toUpperCase(),
      cutOffTime: day.cutOffTime,
    })),
    regions: selectedRegions1.map((region) => ({
      regionId: region.id,
      minOrder: region.minOrder,
      areas: region.postalCodeArea.map((area) => ({ areaId: area.id })),
    })),
  });

  const handleAddDeliveryAreas = async () => {
    addDeliveryDays(preparedData(), {
      onSuccess: () => {
        message.success("Delivery area added successfully");

        setOpen(false);
        setSelectedRegions1([]);
        setSelectedDeliveryDays([]);
        router.push("/dashboard/delivery-areas");
      },
      onError: (error: any) => {
        message.error(error.message);
      },
    });
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    setIsChecked(e.target.checked);
    setSelectedRegions1((prev) =>
      prev.map((item) => ({ ...item, minOrder: "" }))
    );
  };

  const onClose = () => {
    setOpen(false);
  };

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

            {!isEditMode ? (
              <AddDeliveryDays
                usedDays={usedDays}
                selectedDeliveryDays={selectedDeliveryDays}
                handleDayClick={handleDayClick}
                handleCutOffChange={handleCutOffChange}
                selectedRegions={selectedRegions1}
                searchResultsDivRef={searchResultsDivRef}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchResultsOpen={searchResultsOpen}
                setSearchResultsOpen={setSearchResultsOpen}
                handleUpdateRegionSearched={handleUpdateRegionSearched1}
                handleUpdateRegion={handleUpdateRegion1}
                isChecked={isChecked}
                onChange={onChange}
                isFetchingSearchResults={isFetchingSearchResults}
                searchResultsData={searchResultsData}
              />
            ) : (
              <EditDeliveryDays
                selectedDeliveryDays={selectedDeliveryDays}
                setSelectedDeliveryDays={setSelectedDeliveryDays}
                handleDayClick={handleDayClick}
                handleCutOffChange={handleCutOffChange}
                searchResultsDivRef={searchResultsDivRef}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchResultsOpen={searchResultsOpen}
                setSearchResultsOpen={setSearchResultsOpen}
                selectedRegions={selectedRegions}
                handleUpdateRegion={handleUpdateRegion}
                handleUpdateRegionSearched={handleUpdateRegionSearched}
                isChecked={isChecked}
                onChange={onChange}
                showModal={showModal}
                handleToggleRegion={handleToggleRegion}
              />
            )}
          </div>

          <div className="py-10 z-[1]">
            <Button
              // label={isEditMode ? "Save Changes" : "Add Delivery Areas"}
              label={isSubmittingDeliveryDays ? <Spin /> : "Add Delivery Areas"}
              className="text-2xl w-full"
              disabled={isReadyToSubmit()}
              variant={isReadyToSubmit() ? "primary" : "disabled"}
              onClick={handleAddDeliveryAreas}
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

const AddDeliveryDays = ({
  usedDays,
  selectedDeliveryDays,
  handleDayClick,
  handleCutOffChange,
  searchResultsDivRef,
  searchValue,
  setSearchValue,
  searchResultsOpen,
  setSearchResultsOpen,
  selectedRegions,
  handleUpdateRegion,
  handleUpdateRegionSearched,
  isChecked,
  onChange,
  isFetchingSearchResults,
  searchResultsData,
}: {
  usedDays: string[] | undefined;
  selectedDeliveryDays: IDeliveryDay[];
  handleDayClick: (day: string) => void;
  handleCutOffChange: (
    type: "day" | "time",
    deliveryDay: IDeliveryDay,
    value: string
  ) => void;
  searchResultsDivRef: React.RefObject<HTMLDivElement>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchResultsOpen: boolean;
  setSearchResultsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRegions: SelectedRegion[];
  handleUpdateRegion: (
    type: "minOrder" | "area" | "genMinOrder",
    region: Region | undefined,
    value: string
  ) => void;
  handleUpdateRegionSearched: (
    isRegionSelected: boolean,
    region: Region
  ) => void;
  isChecked: boolean;
  onChange: CheckboxProps["onChange"];
  isFetchingSearchResults: boolean;
  searchResultsData: Region[] | undefined;
}) => {
  return (
    <>
      <div className="my-2 flex gap-4 flex-wrap mt-8">
        {days.map((day, i) => {
          if (usedDays?.includes(day.toUpperCase())) return null;
          if (!selectedDeliveryDays.find((item) => item.day === day))
            return (
              <button
                key={`${day}-${i}`}
                className="text-grey-2 text-base leading-6 px-6 py-2.5 bg-grey-1 w-fit rounded-[100px] cursor-pointer font-medium"
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            );
        })}
      </div>

      {selectedDeliveryDays.length ? (
        <SelectedDeliveryDayConfig
          selectedDeliveryDays={selectedDeliveryDays}
          handleCutOffChange={handleCutOffChange}
          handleDayClick={handleDayClick}
          isRemovable={true}
        />
      ) : null}

      {selectedDeliveryDays.length ? (
        <SearchDeliveryAreas
          searchResultsDivRef={searchResultsDivRef}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchResultsOpen={searchResultsOpen}
          setSearchResultsOpen={setSearchResultsOpen}
          selectedRegions={selectedRegions}
          handleUpdateRegionSearched={handleUpdateRegionSearched}
          isFetchingSearchResults={isFetchingSearchResults}
          searchResultsData={searchResultsData}
        />
      ) : null}

      {selectedRegions.length && selectedDeliveryDays.length ? (
        <div className="my-8 relative">
          <h2 className="text-grey-2 text-xl font-gosha mb-2.5">
            Areas delivered to on &quot;selected.days&quot;
          </h2>

          <GeneralMinOrder isChecked={isChecked} onChange={onChange} handleUpdateRegion={handleUpdateRegion} />

          <div className="max-h-[450px] overflow-y-scroll">
            {selectedRegions.map((region) => {
              return (
                <div
                  key={`${region.id}`}
                  className="border-[1.5px] border-grey-4 rounded-[10px] p-2.5 mb-4"
                >
                  <div className={`flex items-center justify-between mb-3`}>
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
                        <button
                          className={`text-grey-2 text-base font-semibold`}
                        >
                          {region.name}
                        </button>
                        {region.postalCodeArea.length ===
                        region.originalAreasLength ? (
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
                            onChange={(e) =>
                              handleUpdateRegion(
                                "minOrder",
                                region,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.postalCodeArea.map((area, i) => (
                      <button
                        key={`${area.id}`}
                        className="flex items-center gap-1 text-grey-6 px-2 w-fit rounded-[20px] cursor-pointer bg-primary"
                        onClick={() =>
                          handleUpdateRegion("area", region, area.name)
                        }
                      >
                        <CloseOutlined style={{ color: "#334054" }} />
                        <p className="text-sm font-medium leading-5">
                          {area.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

const EditDeliveryDays = ({
  selectedDeliveryDays,
  handleDayClick,
  handleCutOffChange,
  searchResultsDivRef,
  searchValue,
  setSearchValue,
  searchResultsOpen,
  setSearchResultsOpen,
  selectedRegions,
  handleUpdateRegion,
  handleUpdateRegionSearched,
  isChecked,
  onChange,
  showModal,
  handleToggleRegion,
}: any) => {
  return (
    <>
      {selectedDeliveryDays.length ? (
        <SelectedDeliveryDayConfig
          selectedDeliveryDays={selectedDeliveryDays}
          handleCutOffChange={handleCutOffChange}
          handleDayClick={handleDayClick}
          isRemovable={false}
        />
      ) : null}

      {selectedDeliveryDays.length ? (
        <SearchDeliveryAreas
          searchResultsDivRef={searchResultsDivRef}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchResultsOpen={searchResultsOpen}
          setSearchResultsOpen={setSearchResultsOpen}
          selectedRegions={selectedRegions}
          handleUpdateRegionSearched={handleUpdateRegionSearched}
        />
      ) : null}

      {selectedRegions.length && selectedDeliveryDays.length ? (
        <div className="my-8 relative">
          <h2 className="text-grey-2 text-xl font-gosha mb-2.5">
            Areas delivered to on &quot;selected.days&quot;
          </h2>
          <GeneralMinOrder isChecked={isChecked} onChange={onChange} handleUpdateRegion={handleUpdateRegion} />

          <div className="max-h-[450px] overflow-y-scroll">
            {selectedRegions.map((region, i) => {
              const regionIndex = regions.findIndex(
                (r) => r.region === region.region
              );
              return (
                <div
                  key={`${region}-${i}`}
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
                        <button
                          className={`flex gap-1 items-center cursor-pointertext-grey-2 text-base font-semibold`}
                          onClick={() => showModal()}
                        >
                          <CloseOutlined style={{ color: "#334054" }} />

                          {region.region}
                        </button>
                        {region.areas.length ===
                        regions[regionIndex].areas.length ? (
                          <button
                            onClick={() => handleToggleRegion(region.region)}
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
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleRegion(region.region)}
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
                          </button>
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
                    {!region.hidden &&
                      region.areas.map((area, i) => (
                        <button
                          key={`${area}-${i}`}
                          className="flex items-center gap-1 text-grey-6 px-2 w-fit rounded-[20px] cursor-pointer bg-primary"
                          onClick={() => handleUpdateRegion(region, area)}
                        >
                          <CloseOutlined style={{ color: "#334054" }} />
                          <p className="text-sm font-medium leading-5">
                            {area}
                          </p>
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

const GeneralMinOrder = ({
  onChange,
  isChecked,
  handleUpdateRegion,
}: {
  onChange: CheckboxProps["onChange"];
  isChecked: boolean;
  handleUpdateRegion: (
    type: "minOrder" | "area" | "genMinOrder",
    region: Region | undefined,
    value: string
  ) => void;
}) => {
  return (
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
              onChange={(e) =>
                handleUpdateRegion("genMinOrder", undefined, e.target.value)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

const SearchDeliveryAreas = ({
  searchResultsDivRef,
  searchValue,
  setSearchValue,
  searchResultsOpen,
  setSearchResultsOpen,
  selectedRegions,
  handleUpdateRegionSearched,
  isFetchingSearchResults,
  searchResultsData,
}: {
  searchResultsDivRef: React.RefObject<HTMLDivElement>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchResultsOpen: boolean;
  setSearchResultsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRegions: Region[];
  handleUpdateRegionSearched: (
    isRegionSelected: boolean,
    region: Region
  ) => void;
  isFetchingSearchResults: boolean;
  searchResultsData: Region[] | undefined;
}) => {
  return (
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
        {searchResultsOpen && searchValue.length > 1 ? (
          <ul className="bg-white-1 mt-3 border-grey-4 border-[1.2px] rounded-lg px-6 py-4 absolute w-full z-20 max-h-[260px] overflow-y-scroll">
            {isFetchingSearchResults ? (
              <span className="flex justify-center items-center">
                <Spin className="custom-spin mr-1" />
                &nbsp;Loading search results...
              </span>
            ) : null}
            {!isFetchingSearchResults &&
              (searchResultsData?.length === 0 ? (
                <p>No results found!</p>
              ) : (
                searchResultsData?.map((region: Region) => {
                  const isRegionSelected = selectedRegions.some(
                    (selectedRegion) => selectedRegion.id === region.id
                  );

                  return (
                    <button
                      key={`${region.id}`}
                      className="cursor-pointer block w-full"
                      onClick={() =>
                        handleUpdateRegionSearched(isRegionSelected, region)
                      }
                    >
                      <div className="flex justify-between items-center text-xl text-grey-2 ">
                        <p>{region.name}</p>
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
                    </button>
                  );
                })
              ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

const SelectedDeliveryDayConfig = ({
  selectedDeliveryDays,
  handleCutOffChange,
  handleDayClick,
  isRemovable = true,
}: {
  selectedDeliveryDays: IDeliveryDay[];
  handleDayClick: (day: (typeof days)[number]) => void;
  handleCutOffChange: (
    type: "day" | "time",
    deliveryDay: IDeliveryDay,
    value: string
  ) => void;
  isRemovable?: boolean;
}) => {
  return (
    <div className="my-8 mb-2">
      <h2 className="text-grey-2 text-xl font-gosha">Selected delivery day</h2>
      {selectedDeliveryDays.map((deliveryDay, i) => (
        <div
          key={`${deliveryDay}-${i}`}
          className="my-4 flex items-center justify-between"
        >
          <button
            className="flex items-center gap-2.5 text-grey-2 px-6 py-2.5 w-fit rounded-[100px] cursor-pointer bg-primary"
            onClick={() =>
              isRemovable ? handleDayClick(deliveryDay.day) : null
            }
          >
            {isRemovable && <CloseOutlined style={{ color: "#334054" }} />}

            <p className="text-base leading-6 font-semibold capitalize">
              {deliveryDay.day?.toLowerCase()}
            </p>
          </button>
          <div className="flex gap-2 items-center">
            <p>Cut off time:</p>
            <div className="bg-grey-1 pr-2 rounded-lg cursor-pointer">
              <select
                className="text-grey-6 capitalize font-medium bg-grey-1 rounded-lg py-1 pl-4 -pr-2 focus:outline-none cursor-pointer"
                onChange={(e) =>
                  handleCutOffChange("day", deliveryDay, e.target.value)
                }
              >
                <option selected key={`${deliveryDay.cutOffDay}`}>
                  {deliveryDay.cutOffDay.toLowerCase()}
                </option>
                {days.map(
                  (day, i) =>
                    deliveryDay.cutOffDay !== day && (
                      <option key={`${day}-${i}`} value={day}>
                        {day}
                      </option>
                    )
                )}
              </select>
            </div>
            <div className="bg-grey-1 pr-2 rounded-lg cursor-pointer">
              <select
                className="text-grey-6 font-medium bg-grey-1 rounded-lg py-1 pl-4 -pr-2 focus:outline-none cursor-pointer"
                onChange={(e) =>
                  handleCutOffChange("time", deliveryDay, e.target.value)
                }
              >
                <option selected key={`${deliveryDay.cutOffTime}`}>
                  {deliveryDay.cutOffTime}
                </option>
                {times.map(
                  (time, i) =>
                    deliveryDay.cutOffTime !== time && (
                      <option key={`${time}-${i}`} value={time}>
                        {time}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
