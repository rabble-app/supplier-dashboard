/** @format */

import { API_ENDPOINT, setHeaders } from "../../../actions/config";
import { message } from "antd";
import { Region } from "../home/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const handleGetDeliveryDays = async () => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/postal-code/producer/delivery-days`;

  try {
    console.log("FETCHING DELIVERY DAYS...");
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data: any = await res.json();
    if (res.ok) {
      return data.data?.map((item: any) => {
        const mergeProducerAreas = (regions: any) => {
          const mergedAreas: any = [];

          regions.forEach((region: any) => {
            mergedAreas.push(...region.producerAreas);
          });

          return mergedAreas;
        };
        return {
          ...item,
          areas: mergeProducerAreas(item.regions),
        };
      });
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

export const handleSearchRegionsOrAreas = async (
  query: string
): Promise<Region[]> => {
  const token = localStorage.token;

  let url = `${API_ENDPOINT}/postal-code/search/${query}`;

  try {
    console.log("FETCHING SEARCH RESULTS...");
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data: any = await res.json();
    if (res.ok) {
      return data.data;
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

export const useAddDeliveryDays = () => {
  const token = localStorage.token;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      let res = await fetch(`${API_ENDPOINT}/postal-code/producer/delivery-days`, {
        headers: setHeaders(token),
        method: "POST",
        body: JSON.stringify(data),
      });

      let resp = await res.json();
      if (res.ok) {
        return resp.data;
      } else {
        throw new Error(JSON.stringify(resp));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["delivery-days"]});
    }
  });
};

export const useUpdateDeliveryDay = (id: string) => {
  const token = localStorage.token;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      let res = await fetch(`${API_ENDPOINT}/postal-code/producer/delivery-day-info/${id}`, {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["delivery-days"]});
    }
  });
};

export const useUpdateDeliveryRegionsOrAreas = () => {
  const token = localStorage.token;
  let url = `${API_ENDPOINT}/postal-code/producer/delivery-area`;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      let res = await fetch(url, {
        headers: setHeaders(token),
        method: "PUT",
        body: JSON.stringify(data),
      });

      let resp = await res.json();
      if (res.ok) {
        return resp.data;
      } else {
        throw new Error(JSON.stringify(resp));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["delivery-days"]});
    }
  });
};

export const useDeleteDeliveryRegion = () => {
  const token = localStorage.token;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      let res = await fetch(`${API_ENDPOINT}/postal-code/producer/delivery-region/${id}`, {
        headers: setHeaders(token),
        method: "DELETE",
      });

      let resp = await res.json();
      if (res.ok) {
        return resp.data;
      } else {
        throw new Error(JSON.stringify(resp));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["delivery-days"]});
    }
  });
};

export const useDeleteDeliveryArea = () => {
  const token = localStorage.token;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      let res = await fetch(`${API_ENDPOINT}/postal-code/producer/delivery-area/${id}`, {
        headers: setHeaders(token),
        method: "DELETE",
      });

      let resp = await res.json();
      if (res.ok) {
        return resp.data;
      } else {
        throw new Error(JSON.stringify(resp));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["delivery-days"]});
    }
  });
};
