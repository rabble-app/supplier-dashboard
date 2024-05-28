/** @format */

"use client";
import { useState, useEffect, useRef } from "react";
import { Drawer, Modal, Spin, message } from "antd";
import type { CheckboxProps } from "antd";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import "react-phone-number-input/style.css";
import { days, times } from "../data";
import TrashIcon from "@/components/svgs/TrashIcon";
import {
  handleSearchRegionsOrAreas,
  useAddDeliveryDays,
  useDeleteDeliveryArea,
  useDeleteDeliveryRegion,
  useUpdateDeliveryDay,
  useUpdateDeliveryRegionsOrAreas,
} from "../../delivery-areas/api";
import EditDeliveryDays from "./EditDeliveryDays";
import AddDeliveryDays from "./AddDeliveryDays";
import {
  IDeliveryDay,
  Region,
  RegionOptionType,
  SelectedRegion,
} from "../interfaces";

interface ISupplierDetailsDrawer {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditing?: boolean;
  deliveryDaysData?: any;
}

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
  const [selectedRegions, setSelectedRegions] = useState<SelectedRegion[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState({} as SelectedRegion);
  const [editModeAreas, setEditModeAreas] = useState(false);
  const [editModeDays, setEditModeDays] = useState(false);

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
  const {
    mutate: updateDeliveryRegionsOrAreas,
    isPending: isUpdatingDeliveryRegionsOrAreas,
  } = useUpdateDeliveryRegionsOrAreas();
  const { mutate: deleteDeliveryRegion, isPending: isDeletingDeliveryRegion } =
    useDeleteDeliveryRegion();
  const { mutate: deleteDeliveryArea } = useDeleteDeliveryArea();

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
          const getProducerAreas = (region: SelectedRegion) =>
            region.producerAreas.map((area: any) => ({
              id: area.area.id,
              name: area.area.name,
              areaDbId: area.id,
            }));
          return deliveryDay.regions.map((region: SelectedRegion) => {
            return {
              id: region.region.id,
              name: region.region.name,
              postalCodeArea: getProducerAreas(region),
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
          setEditModeDays(false);
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      }
    );
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
          setEditModeAreas(false);
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      }
    );
  };

  const handleDeleteDeliveryRegion = (id?: string) => {
    deleteDeliveryRegion(id!, {
      onSuccess: () => {
        message.success("Delivery region deleted successfully");
        handleCancel();
      },
      onError: (error: any) => {
        message.error(error.message);
      },
    });
  };

  const handleDeleteDeliveryArea = (id?: string) => {
    deleteDeliveryArea(id!, {
      onSuccess: () => {
        message.success("Delivery area deleted successfully");
        setEditModeAreas(false);
      },
      onError: (error: any) => {
        message.error(error.message);
      },
    });
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
    setEditModeAreas(false);
    setEditModeDays(false);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const showModal = (region: SelectedRegion) => {
    setIsModalOpen(true);
    setSelectedRegion(region);
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
                handleUpdateDeliveryRegionsOrAreas={
                  handleUpdateDeliveryRegionsOrAreas
                }
                isUpdatingDeliveryRegionsOrAreas={
                  isUpdatingDeliveryRegionsOrAreas
                }
                handleDeleteDeliveryArea={handleDeleteDeliveryArea}
                editModeAreas={editModeAreas}
                setEditModeAreas={setEditModeAreas}
                editModeDays={editModeDays}
                setEditModeDays={setEditModeDays}
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
              {selectedRegion.name}
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
            label={
              isDeletingDeliveryRegion ? (
                <Spin className="custom-spin-white" />
              ) : (
                "Delete Region"
              )
            }
            className="text-white !bg-danger"
            size="sm"
            onClick={() =>
              handleDeleteDeliveryRegion(selectedRegion.regionDbId)
            }
            icon={
              isDeletingDeliveryRegion ? <TrashIcon color="#ffffff" /> : null
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default DeliveryAreasDrawer;
