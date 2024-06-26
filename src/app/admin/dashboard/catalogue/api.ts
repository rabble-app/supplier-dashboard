/** @format */

import { message } from "antd";
import { API_ENDPOINT, setHeaders } from "../../../../actions/config";
import { ICatalogueStatus } from "./interfaces";
import { formatAmount } from "@/utils";

export const handleGetCatalogue = async (
  page: number,
  query: string,
  status: ICatalogueStatus = ICatalogueStatus.APPROVED
) => {
  const token = localStorage.token;

  const offset = (page - 1) * 7;
  const char = query ? "?" : "&";
  const url = `${API_ENDPOINT}/products/admin${
    !query ? `/section?offset=${offset}` : `/search/${query}`
  }${char}approvalStatus=${status}`;
  console.log(url);
  try {
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data = await res.json();

    if (res.ok) {
      const catalogue = query ? data.data.slice() : data.data[1];
      data = {
        ...data,
        data: [
          ...(!query ? [data.data[0]] : [catalogue.length]),
          catalogue.map((item: any) => {
            return {
              key: item.id,
              imageUrl:
                item.imageUrl ||
                "https://rabble-dev1.s3.us-east-2.amazonaws.com/products/image+29.png",
              skuCode: item.id.split("-")[0],
              supplierName: item.name,
              description: item.description,
              stock: item.stock,
              category: item.producer?.categories?.[0]?.category?.name,
              subCategory: item.category?.name,
              sharedProduct: item.type === "SINGLE" ? false : true,
              units: item.quantityOfSubUnitPerOrder,
              wholesalePrice: item.wholesalePrice || 0,
              retailPrice: item.price || 0,
              vat: item.vat || 0,
              unitOfMeasure: item.unitsOfMeasurePerSubUnit,
              pricePerMeasure: `${formatAmount(item.price)}/${
                item.unitsOfMeasurePerSubUnit
              }`,
            };
          }),
        ],
      };
    } else {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    message.error(errorObject.message);
    console.log(errorObject);
    return errorObject;
  }
};

export const handleApproveOrRejectCatalogue = async (
  ids: React.Key[],
  action: "APPROVED" | "REJECTED"
) => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/products/admin/update`;

  console.log(url);
  try {
    let res = await fetch(url, {
      headers: setHeaders(token),
      method: "PATCH",
      body: JSON.stringify({
        approvalStatus: action,
        products: ids,
      }),
    });

    let data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(JSON.stringify(data));
    }
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    message.error(errorObject.message);
    console.log(errorObject);
    return errorObject;
  }
};
