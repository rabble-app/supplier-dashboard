/** @format */

import { CheckboxProps } from "antd";
import { days, times } from "./data";

export interface IDeliveryDay {
  day: (typeof days)[number];
  cutOffDay: (typeof days)[number];
  cutOffTime: (typeof times)[number];
}

export interface Region {
  id: string;
  name: string;
  postalCodeArea: { id: string; name: string; areaDbId?: string }[];
  producerAreas: { id: string; name: string; areaDbId?: string }[];
  region: { id: string; name: string };
}

export interface SelectedRegion extends Region {
  minOrder?: string;
  minimumOrder?: string;
  hidden?: boolean;
  regionDbId?: string;
  originalAreasLength?: number;
}

export interface CommonProps {
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
}

export type RegionOptionType = "minOrder" | "area" | "genMinOrder";
