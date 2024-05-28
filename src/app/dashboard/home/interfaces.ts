/** @format */

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

export type RegionOptionType = "minOrder" | "area" | "genMinOrder";
