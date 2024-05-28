/** @format */

"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Checkbox, Divider, Drawer, Modal, Spin, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { CheckboxProps } from "antd";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  useUpdateDeliveryDay,
  useUpdateDeliveryRegionsOrAreas,
} from "../../delivery-areas/api";
import EditIcon from "@/components/svgs/EditIcon";

interface ISupplierDetailsDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditing?: boolean;
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
  producerAreas: { id: string; name: string; areaDbId?: string }[];
  region: { id: string; name: string };
}

interface SelectedRegion extends Region {
  minOrder?: string;
  minimumOrder?: string;
  hidden?: boolean;
  regionDbId?: string;
  originalAreasLength?: number;
}

type RegionOptionType = "minOrder" | "area" | "genMinOrder";

const DeliveryAreasDrawer = ({
  open,
  setOpen,
  isEditing = false,
  deliveryDaysData,
}: ISupplierDetailsDrawer) => {
  const [selectedDeliveryDays, setSelectedDeliveryDays] = useState<
    IDeliveryDay[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRegions, setSelectedRegions] = useState<SelectedRegion[]>(
    []
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  const searchResultsDivRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(`${searchParams}`);
  const selectedDeliveryDayId = params.get("id");

  const usedDays = deliveryDaysData?.map((day: any) => day.day) ?? [];

  const { mutate: addDeliveryDays, isPending: isSubmittingDeliveryDays } =
    useAddDeliveryDays();
  const { mutate: updateDeliveryDay, isPending: isUpdatingDeliveryDay } =
    useUpdateDeliveryDay(selectedDeliveryDayId!);
  const { mutate: updateDeliveryRegionsOrAreas, isPending: isUpdatingDeliveryRegionsOrAreas } =
    useUpdateDeliveryRegionsOrAreas();

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
    if (selectedDeliveryDayId && deliveryDaysData?.length) {
      const deliveryDay = deliveryDaysData.find(
        (day: any) => day.id === selectedDeliveryDayId
      );
      if (deliveryDay) {
        setSelectedDeliveryDays([
          {
            day: deliveryDay.day,
            cutOffDay: deliveryDay.cutOffDay,
            cutOffTime: deliveryDay.cutOffTime,
          },
        ]);
        setSelectedRegions(() => {
          return deliveryDay.regions.map((region: SelectedRegion) => {
            return {
              id: region.region.id,
              name: region.region.name,
              postalCodeArea: region.producerAreas.map((area: any) => ({
                id: area.area.id,
                name: area.area.name,
                areaDbId: area.id,
              })),
              minOrder: region.minimumOrder,
              originalAreasLength: region.producerAreas.length,
              regionDbId: region.id,
            };
          });
        });
      } else {
        setNotFound(true);
      }
    }
  }, [selectedDeliveryDayId, deliveryDaysData]);

  useEffect(() => {
    if (searchValue.length) {
      setSearchResultsOpen(true);
    } else {
      setSearchResultsOpen(false);
    }
  }, [searchValue]);

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

  const handleToggleRegion = (regionName: string) => {
    setSelectedRegions((prev) =>
      prev.map((region) =>
        region.name === regionName
          ? {
              ...region,
              hidden: !region.hidden,
            }
          : region
      )
    );
  };

  const handleUpdateRegion = (
    type: RegionOptionType,
    region: Region | undefined,
    value: string
  ) => {
    const filteredAreas = (areas: { id: string; name: string }[]) =>
      areas.filter((a) => a.name !== value);
    if (type === "area") {
      if (region?.postalCodeArea.length !== 1) {
        setSelectedRegions((prev) =>
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
        setSelectedRegions((prev) =>
          prev.filter((item) => item.id !== region.id)
        );
      }
    } else if (type === "minOrder") {
      setSelectedRegions((prev) =>
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
      setSelectedRegions((prev) =>
        prev.map((item) => ({ ...item, minOrder: value }))
      );
    }
  };

  const handleUpdateRegionSearched = (
    isRegionSelected: boolean,
    region: Region
  ) => {
    if (isRegionSelected) {
      if (isEditing) return null;
      setSelectedRegions((prev) =>
        prev.filter((item) => item.id !== region.id)
      );
    } else {
      setSelectedRegions((prev) => [
        ...prev,
        { ...region, originalAreasLength: region.postalCodeArea.length },
      ]);
    }
  };

  const isReadyToSubmit = () => {
    const checkMinOrder = selectedRegions.every((region) => region.minOrder);
    return (
      selectedRegions.length > 0 &&
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
    regions: selectedRegions.map((region) => ({
      regionId: region.id,
      minOrder: region.minOrder,
      areas: region.postalCodeArea.map((area) => ({ areaId: area.id })),
    })),
  });

  const handleAddDeliveryAreas = () => {
    addDeliveryDays(preparedData(), {
      onSuccess: () => {
        message.success("Delivery area added successfully");

        setOpen(false);
        setSelectedRegions([]);
        setSelectedDeliveryDays([]);
        router.push("/dashboard/delivery-areas");
      },
      onError: (error: any) => {
        message.error(error.message);
      },
    });
  };

  const handleUpdateDeliveryDay = () => {
    updateDeliveryDay(
      {
        cutOffDay: selectedDeliveryDays[0].cutOffDay.toUpperCase(),
        cutOffTime: selectedDeliveryDays[0].cutOffTime.toUpperCase(),
      },
      {
        onSuccess: () => {
          message.success("Delivery day info updated successfully");
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      }
    )
  };

  const handleUpdateDeliveryRegionsOrAreas = () => {
    updateDeliveryRegionsOrAreas(
      {
        deliveryDayId: selectedDeliveryDayId,
        regions: selectedRegions.map((region) => ({
          regionId: region.id,
          minOrder: region.minOrder,
          areas: region.postalCodeArea.map((area) => ({ areaId: area.id })),
        })),
      },
      {
        onSuccess: () => {
          message.success("Delivery region/area added successfully");
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      }
    )
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    setIsChecked(e.target.checked);

    if (!isEditing) {
      setSelectedRegions((prev) =>
        prev.map((item) => ({ ...item, minOrder: "" }))
      );
    }
  };

  const onClose = () => {
    setOpen(false);
    params.delete("id");
    setSelectedDeliveryDays([]);
    setSelectedRegions([]);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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

  const renderButtonLabel = () => {
    let label: string | JSX.Element;

    if (isSubmittingDeliveryDays) {
      label = <Spin />;
    } else if (isEditing) {
      label = "Done";
    } else {
      label = "Add Delivery Areas";
    }

    return label;
  };

  const handleButtonClick = () => {
    if (isEditing) {
      onClose();
    } else {
      handleAddDeliveryAreas();
    }
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
              {isEditing ? "Edit delivery details" : "Delivery details"}
            </h1>
            <p className="text-sm leading-6 font-poppins text-grey-2 mb-4">
              {isEditing
                ? "Editing your delivery day to let customers know which days they can place orders for"
                : "Select your delivery days to let customers know which days they can place orders for"}
            </p>

            {!isEditing ? (
              <AddDeliveryDays
                usedDays={usedDays}
                selectedDeliveryDays={selectedDeliveryDays}
                handleDayClick={handleDayClick}
                handleCutOffChange={handleCutOffChange}
                selectedRegions={selectedRegions}
                searchResultsDivRef={searchResultsDivRef}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchResultsOpen={searchResultsOpen}
                setSearchResultsOpen={setSearchResultsOpen}
                handleUpdateRegionSearched={handleUpdateRegionSearched}
                handleUpdateRegion={handleUpdateRegion}
                isChecked={isChecked}
                onChange={onChange}
                isFetchingSearchResults={isFetchingSearchResults}
                searchResultsData={searchResultsData}
              />
            ) : (
              <EditDeliveryDays
                selectedDeliveryDayId={selectedDeliveryDayId}
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
                isFetchingSearchResults={isFetchingSearchResults}
                searchResultsData={searchResultsData}
                notFound={notFound}
                isEditing={isEditing}
                handleUpdateDeliveryDay={handleUpdateDeliveryDay}
                isUpdatingDeliveryDay={isUpdatingDeliveryDay}
                handleUpdateDeliveryRegionsOrAreas={handleUpdateDeliveryRegionsOrAreas}
                isUpdatingDeliveryRegionsOrAreas={isUpdatingDeliveryRegionsOrAreas}
              />
            )}
          </div>

          {!notFound && (
            <div className="py-10 z-[1]">
              <Button
                label={renderButtonLabel()}
                className="text-2xl w-full"
                disabled={isReadyToSubmit()}
                variant={isReadyToSubmit() ? "primary" : "disabled"}
                onClick={handleButtonClick}
              />
            </div>
          )}
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
    type: RegionOptionType,
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

          <GeneralMinOrder
            isChecked={isChecked}
            onChange={onChange}
            handleUpdateRegion={handleUpdateRegion}
          />

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
  selectedDeliveryDayId,
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
  isFetchingSearchResults,
  searchResultsData,
  notFound,
  isEditing,
  handleUpdateDeliveryDay,
  isUpdatingDeliveryDay,
  handleUpdateDeliveryRegionsOrAreas,
  isUpdatingDeliveryRegionsOrAreas,
}: {
  selectedDeliveryDayId: string | null;
  selectedDeliveryDays: IDeliveryDay[];
  setSelectedDeliveryDays: React.Dispatch<React.SetStateAction<IDeliveryDay[]>>;
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
    type: RegionOptionType,
    region: Region | undefined,
    value: string
  ) => void;
  handleUpdateRegionSearched: (
    isRegionSelected: boolean,
    region: Region
  ) => void;
  isChecked: boolean;
  onChange: CheckboxProps["onChange"];
  showModal: () => void;
  handleToggleRegion: (region: string) => void;
  isFetchingSearchResults: boolean;
  searchResultsData: Region[] | undefined;
  notFound: boolean;
  isEditing: boolean;
  handleUpdateDeliveryDay: () => void;
  isUpdatingDeliveryDay: boolean;
  handleUpdateDeliveryRegionsOrAreas: () => void;
  isUpdatingDeliveryRegionsOrAreas: boolean;
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {notFound && (
        <div className="flex justify-center items-center h-screen pb-[300px]">
          <p className="text-lg">
            No data found for ID:{" "}
            <span className="text-blue-1">{selectedDeliveryDayId}</span>{" "}
          </p>
        </div>
      )}
      {selectedDeliveryDayId ? (
        <>
          {selectedDeliveryDays.length ? (
            <SelectedDeliveryDayConfig
              selectedDeliveryDays={selectedDeliveryDays}
              handleCutOffChange={handleCutOffChange}
              handleDayClick={handleDayClick}
              isRemovable={false}
              isEditing={isEditing}
              isUpdatingDeliveryDay={isUpdatingDeliveryDay}
              handleUpdateDeliveryDay={handleUpdateDeliveryDay}
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
              disabled={!editMode}
            />
          ) : null}

          {selectedRegions.length && selectedDeliveryDays.length ? (
            <div className="my-8 relative">
              <DeliveryDayHeader
                title='Areas delivered to on "selected.days"'
                className="mb-2.5"
                editMode={editMode}
                setEditMode={setEditMode}
                handleSave={() => {
                  handleUpdateDeliveryRegionsOrAreas();
                  setEditMode(false);
                }}
                isEditing={isEditing}
                isUpdatingDeliveryDay={isUpdatingDeliveryRegionsOrAreas}
                
              />
              <GeneralMinOrder
                isChecked={isChecked}
                onChange={onChange}
                handleUpdateRegion={handleUpdateRegion}
                disabled={!editMode}
              />

              <div className="max-h-[450px] overflow-y-scroll">
                {selectedRegions.map((region, i) => {
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
                              onClick={() => (editMode ? showModal() : null)}
                            >
                              {editMode && (
                                <CloseOutlined style={{ color: "#334054" }} />
                              )}

                              {region.name}
                            </button>
                            {region.postalCodeArea.length ===
                            region.originalAreasLength ? (
                              <button
                                onClick={() => handleToggleRegion(region.name)}
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
                                onClick={() => handleToggleRegion(region.name)}
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
                            <div
                              className={`${
                                editMode ? "bg-grey-1" : "bg-grey-4"
                              } rounded-lg text-sm px-4 py-1 flex items-center gap-3`}
                            >
                              <p className="text-grey-6 font-medium">£</p>
                              <input
                                className={`w-14 text-base text-right ${
                                  editMode ? "bg-grey-1" : "bg-grey-4"
                                } pr-2 outline-none ${
                                  editMode ? "" : "cursor-not-allowed"
                                }`}
                                type="number"
                                placeholder="0.00"
                                step=".01"
                                defaultValue={region.minOrder}
                                onChange={(e) =>
                                  handleUpdateRegion(
                                    "minOrder",
                                    region,
                                    e.target.value
                                  )
                                }
                                disabled={!editMode}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {!region.hidden &&
                          region.postalCodeArea.map((area, i) => (
                            <button
                              key={`${area}-${i}`}
                              className="flex items-center gap-1 text-grey-6 px-2 w-fit rounded-[20px] cursor-pointer bg-primary"
                              onClick={() =>
                                editMode
                                  ? handleUpdateRegion(
                                      "area",
                                      region,
                                      area.name
                                    )
                                  : null
                              }
                            >
                              {editMode && (
                                <CloseOutlined style={{ color: "#334054" }} />
                              )}
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
      ) : null}
    </>
  );
};

const GeneralMinOrder = ({
  onChange,
  isChecked,
  handleUpdateRegion,
  disabled,
}: {
  onChange: CheckboxProps["onChange"];
  isChecked: boolean;
  handleUpdateRegion: (
    type: RegionOptionType,
    region: Region | undefined,
    value: string
  ) => void;
  disabled?: boolean;
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
          <div
            className={`${
              disabled ? "bg-grey-4" : "bg-grey-1"
            } rounded-lg text-sm px-4 py-1 flex items-center gap-3`}
          >
            <p className="text-grey-6 font-medium">£</p>
            <input
              className={`w-14 text-base text-right ${
                disabled ? "bg-grey-4" : "bg-grey-1"
              } pr-2 outline-none ${disabled ? "cursor-not-allowed" : ""}`}
              type="number"
              placeholder="0.00"
              step=".01"
              onChange={(e) =>
                handleUpdateRegion("genMinOrder", undefined, e.target.value)
              }
              disabled={disabled}
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
  disabled,
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
  disabled?: boolean;
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
          disabled={disabled}
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
  isEditing,
  isUpdatingDeliveryDay,
  handleUpdateDeliveryDay,
}: {
  selectedDeliveryDays: IDeliveryDay[];
  handleDayClick: (day: (typeof days)[number]) => void;
  handleCutOffChange: (
    type: "day" | "time",
    deliveryDay: IDeliveryDay,
    value: string
  ) => void;
  isRemovable?: boolean;
  isEditing?: boolean;
  isUpdatingDeliveryDay?: boolean;
  handleUpdateDeliveryDay?: () => void;
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="my-8 mb-2">
      <DeliveryDayHeader
        title="Selected delivery day"
        editMode={editMode}
        setEditMode={setEditMode}
        handleSave={() => {
          handleUpdateDeliveryDay?.();
          setEditMode(false);
        }}
        isEditing={isEditing}
        isUpdatingDeliveryDay={isUpdatingDeliveryDay}
      />
      {selectedDeliveryDays.map((deliveryDay, i) => (
        <div
          key={`${deliveryDay}-${i}`}
          className="my-4 flex items-center justify-between"
        >
          <button
            className={`flex items-center gap-2.5 text-grey-2 px-6 py-2.5 w-fit rounded-[100px] cursor-pointer bg-primary`}
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
            <select
              className={`text-grey-6 capitalize font-medium rounded-lg py-1 pl-4 -pr-2 focus:outline-none ${
                editMode
                  ? "bg-grey-1 cursor-pointer"
                  : "bg-grey-4 cursor-not-allowed"
              }`}
              onChange={(e) =>
                handleCutOffChange("day", deliveryDay, e.target.value)
              }
              disabled={!editMode}
            >
              <option selected key={`${deliveryDay.cutOffDay}`}>
                {deliveryDay.cutOffDay.toLowerCase()}
              </option>
              {days.map(
                (day, i) =>
                  deliveryDay.cutOffDay.toLowerCase() !== day.toLowerCase() && (
                    <option key={`${day}-${i}`} value={day}>
                      {day}
                    </option>
                  )
              )}
            </select>
            <select
              className={`text-grey-6 font-medium rounded-lg py-1 pl-4 -pr-2 focus:outline-none  ${
                editMode
                  ? "bg-grey-1 cursor-pointer"
                  : "bg-grey-4 cursor-not-allowed"
              }`}
              onChange={(e) =>
                handleCutOffChange("time", deliveryDay, e.target.value)
              }
              disabled={!editMode}
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
      ))}
    </div>
  );
};

const DeliveryDayHeader = ({
  title,
  editMode,
  setEditMode,
  handleSave,
  className = "",
  isEditing,
  isUpdatingDeliveryDay,
}: {
  title: string;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  className?: string;
  isEditing?: boolean;
  isUpdatingDeliveryDay?: boolean;
}) => {
  return (
    <div
      className={`flex gap-2 items-center ${
        editMode ? "justify-between" : ""
      } ${className}`}
    >
      <h2 className="text-grey-2 text-xl font-gosha">{title}</h2>

      {isEditing && (
        <>
          {!editMode && (
            <EditIcon
              color="#667085"
              className="cursor-pointer"
              onClick={() => setEditMode(true)}
            />
          )}

          {editMode && (
            <div className="flex gap-2.5">
              <Button
                label="Cancel"
                className="text-grey-2 bg-white-3"
                size="xs"
                onClick={() => setEditMode(false)}
              />
              <Button
                label={isUpdatingDeliveryDay ? <Spin size="small" /> : "Save"}
                className="bg-primary"
                size="xs"
                onClick={handleSave}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
