/** @format */

import { ChangeEvent } from "react";
import { Spin } from "antd";
import Image from "next/image";

import Input from "@/components/auth/Input";
import { Region } from "../interfaces";

export default function SearchDeliveryAreas({
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
}: Readonly<{
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
}>) {
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
}
