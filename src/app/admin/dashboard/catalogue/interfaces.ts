/** @format */

export interface ICatalogue {
  skuCode: string;
  imgSrc: string;
  title: string;
  description: string;
  stock: number;
  category: string;
  subCategory: string;
  sharedProducts: boolean;
  units: number;
  wholesalePrice: number;
  retailPrice: number;
  vat: number;
  unitOfMeasure: string;
  subUnitOfMeasure: string;
  pricePerMeasure: number;
}

export enum ICatalogueStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
