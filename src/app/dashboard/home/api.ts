/** @format */

import { formatDate, formatRelativeTime } from "@/utils";
import { API_ENDPOINT, setHeaders } from "../../../actions/config";

export const handleGetRecentOrders = async () => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/users/producer/orders/recent`;

  try {
    console.log("FETCHING RECENT ORDERS...");
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data = await res.json();
    if (res.ok) {
      return data.data?.map((item: any) => {
        const orderItem = item.team;
        const address = orderItem?.host?.shipping;
        return {
          ...item,
          key: item.id,
          producerId: orderItem?.producer?.id,
          address: address
            ? `${address?.buildingNo} ${address?.address} ${address?.city}`
            : null,
          frequency: formatRelativeTime(orderItem?.frequency),
          orderValue: item.accumulatedAmount,
          delivery: item.deliveryDate && formatDate(item.deliveryDate),
          orderStatus: item.status,
        };
      });
    } else {
      throw new Error(JSON.stringify(data));
    }
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    console.log(errorObject);
    return errorObject;
  }
};

export const handleGetCurrentProducer = async (producerId: string) => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/users/producer/${producerId}`;

  try {
    console.log("FETCHING CURRENT PRODUCER...");
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data = await res.json();
    if (res.ok) {
      return data.data;
    } else {
      throw new Error(JSON.stringify(data));
    }
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    console.log(errorObject);
    return errorObject;
  }
};

export const handleUpdateProducer = async (producerId: string, data?: any) => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/users/producer/${producerId}`;

  try {
    console.log("UPDATING CURRENT PRODUCER...");
    let res = await fetch(url, {
      headers: setHeaders(token),
      method: "PATCH",
      body: JSON.stringify(data),
    });

    let resp = await res.json();
    if (res.ok) {
      return resp.data;
    } else {
      throw new Error(JSON.stringify(resp));
    }
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    return errorObject;
  }
};

export const handleUpdateProducerCategories = async (preparedData: any) => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/users/producer/category/add`;

  const data = {
    content: preparedData,
  };

  try {
    let res = await fetch(url, {
      headers: setHeaders(token),
      method: "PATCH",
      body: JSON.stringify(data),
    });

    let resp = await res.json();
    console.log(2111, resp)
    if (res.ok) {
      return resp.data;
    } else {
      throw new Error(JSON.stringify(resp));
    }
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    return errorObject;
  }
};
