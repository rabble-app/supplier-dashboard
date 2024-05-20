/** @format */

import { formatDate, formatRelativeTime } from "@/utils";
import { API_ENDPOINT, setHeaders } from "../../../actions/config";

export const handleGetDeliveryDays = async () => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/postal-code/producer/delivery-days`;

  try {
    console.log("FETCHING DELIVERY DAYS...");
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data:any = await res.json();
    if (res.ok) {
      return data.data?.map((item: any) => {
        const mergeProducerAreas=(regions:any) =>{
          const mergedAreas:any = [];
      
          regions.forEach((region:any) => {
              mergedAreas.push(...region.producerAreas);
          });
      
          return mergedAreas;
      }
        return {
          ...item,
          areas: mergeProducerAreas(item.regions)
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

export const handleRemoveProducerCategory = async (id?: string) => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/users/producer/category/remove`;

  const data = {
    producerCategoryId: id,
  };

  try {
    let res = await fetch(url, {
      headers: setHeaders(token),
      method: "DELETE",
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


export const handleUploadProducerImage = async (id: string, file:File) => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/uploads/producer-pix`;

  console.log("UPLOADING PRODUCER IMAGE...");

  const formData = new FormData();
  formData.append('file', file);
  formData.append('producerId', id);

  try {
    let res = await fetch(url, {
      headers: setHeaders(token, null),
      method: "POST",
      body: formData,
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