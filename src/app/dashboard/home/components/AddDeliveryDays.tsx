/** @format */

import { CheckboxProps } from "antd";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";

import {
    CommonProps,
  IDeliveryDay,
  Region,
  RegionOptionType,
  SelectedRegion,
} from "../interfaces";
import SelectedDeliveryDayConfig from "./SelectedDeliveryDayConfig";
import SearchDeliveryAreas from "./SearchDeliveryAreas";
import GeneralMinOrder from "./GenMinOrder";
import { days } from "../data";

interface Props extends CommonProps {
    usedDays: string[] | undefined;
    selectedDeliveryDays: IDeliveryDay[];
  }

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
}:Props) => {
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

export default AddDeliveryDays;
