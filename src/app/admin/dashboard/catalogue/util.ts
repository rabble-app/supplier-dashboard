/** @format */

import { ICatalogueStatus } from "./interfaces";

export const getStatusByTab = (tab: string): ICatalogueStatus | undefined =>
  Object.values(ICatalogueStatus).includes(
    tab.split("-")[0].toUpperCase() as ICatalogueStatus
  )
    ? (tab.split("-")[0].toUpperCase() as ICatalogueStatus)
    : undefined;

export const truncateText = (description: string, wordsToShow: number = 10) =>
  description.split(" ").slice(0, wordsToShow).join(" ");
