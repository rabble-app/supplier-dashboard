/** @format */

import { API_ENDPOINT, setHeaders } from "../../../../actions/config";

export const handleGetInsights = async (
  type: "nwro" | "users",
  activeTab?: { label: string; value: number }
) => {
  const token = localStorage.token;

  let years: number[] = [];

  if (activeTab?.label && activeTab.value) {
    const numYearsMatch = activeTab.label.match(/\d+/);
    if (numYearsMatch) {
      const numYears = parseInt(numYearsMatch[0], 10);
      for (let i = 0; i < numYears; i++) {
        years.push(activeTab.value + i);
      }
    }
  }

  console.log(years);

  const yearsQry = years?.length ? `?years=${years.join(",")}` : "";

  let url = `${API_ENDPOINT}/insights/${type}${yearsQry}`;

  try {
    console.log("FETCHING INSIGHTS...");
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data = await res.json();
    if (res.ok) {
      return data.data?.map((item: any) => ({
        ...item,
        week: item.week.toString(),
        value: Number(item.value),
      }));
    } else {
      throw new Error(JSON.stringify(data));
    }
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    console.log(errorObject);
    return errorObject;
  }
};
