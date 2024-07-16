/** @format */

import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";

import {
    CommonProps,
  IDeliveryDay,
  SelectedRegion,
} from "../interfaces";
import SelectedDeliveryDayConfig from "./SelectedDeliveryDayConfig";
import SearchDeliveryAreas from "./SearchDeliveryAreas";
import DeliveryDayHeader from "./DeliveryDayHeader";
import GeneralMinOrder from "./GenMinOrder";
import EyeOpenIcon from "@/components/svgs/EyeOpenIcon";
import EyeSlashIcon from "@/components/svgs/EyeSlashIcon";

interface Props extends CommonProps{
    selectedDeliveryDayId: string | null;
    selectedDeliveryDays: IDeliveryDay[];
    showModal: (region: SelectedRegion) => void;
    handleToggleRegion: (region: string) => void;
    notFound: boolean;
    isEditing: boolean;
    handleUpdateDeliveryDay: () => void;
    isUpdatingDeliveryDay: boolean;
    handleUpdateDeliveryRegionsOrAreas: () => void;
    isUpdatingDeliveryRegionsOrAreas: boolean;
    handleDeleteDeliveryArea: (id?: string) => void;
    editModeAreas: boolean;
    setEditModeAreas: React.Dispatch<React.SetStateAction<boolean>>;
    editModeDays?: boolean;
    setEditModeDays?: React.Dispatch<React.SetStateAction<boolean>>;
  }

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
  handleDeleteDeliveryArea,
  editModeAreas,
  setEditModeAreas,
  editModeDays,
  setEditModeDays,
}:Props) => {
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
              editModeDays={editModeDays}
              setEditModeDays={setEditModeDays}
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
              disabled={!editModeAreas}
            />
          ) : null}

          {selectedRegions.length && selectedDeliveryDays.length ? (
            <div className="my-8 relative">
              <DeliveryDayHeader
                title='Areas delivered to on "selected.days"'
                className="mb-2.5"
                editMode={editModeAreas}
                setEditMode={setEditModeAreas}
                handleSave={() => handleUpdateDeliveryRegionsOrAreas()}
                isEditing={isEditing}
                isUpdatingDeliveryDay={isUpdatingDeliveryRegionsOrAreas}
              />
              <GeneralMinOrder
                isChecked={isChecked}
                onChange={onChange}
                handleUpdateRegion={handleUpdateRegion}
                disabled={!editModeAreas}
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
                              onClick={() =>
                                editModeAreas ? showModal(region) : null
                              }
                            >
                              {editModeAreas && (
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
                                editModeAreas ? "bg-grey-1" : "bg-grey-4"
                              } rounded-lg text-sm px-4 py-1 flex items-center gap-3`}
                            >
                              <p className="text-grey-6 font-medium">£</p>
                              <input
                                className={`w-14 text-base text-right ${
                                  editModeAreas ? "bg-grey-1" : "bg-grey-4"
                                } pr-2 outline-none ${
                                  editModeAreas ? "" : "cursor-not-allowed"
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
                                disabled={!editModeAreas}
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
                                editModeAreas
                                  ? handleDeleteDeliveryArea(area.areaDbId)
                                  : null
                              }
                            >
                              {editModeAreas && (
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

export default EditDeliveryDays;
