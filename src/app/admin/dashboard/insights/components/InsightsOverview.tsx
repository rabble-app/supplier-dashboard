/** @format */

"use client";
import { useState } from "react";
import { Area, Column } from "@ant-design/plots";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { handleGetInsights } from "../api";
import {
  data2,
  nwroUsersGraphConfig,
  usersGraphConfig,
  yearsTab,
} from "../utils";

const InsightsOverview = () => {
  const [activeTab, setActiveTab] = useState(yearsTab[0]);

  const {
    data: nwroData,
    isFetching: isFetchingNwro,
    isError: isNwroError,
  } = useQuery({
    queryKey: ["insights", "nwro", activeTab.value],
    queryFn: () => handleGetInsights("nwro", activeTab),
  });

  const {
    data: usersData,
    isFetching: isFetchingUsers,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["insights", "users", activeTab.value],
    queryFn: () => handleGetInsights("users", activeTab),
  });

  if (isNwroError || isUsersError) return <div>Error...</div>;

  return (
    <div className="pt-8 relative">
      <PageHeader
        title="Rabble Insights"
        subtitle="KPIs and Metrics for Rabble"
      />
      <button className="text-grey-2 text-base font-medium bg-white rounded-lg border-[1px] border-grey-4 flex gap-2 px-4 py-3 absolute top-10 right-0">
        <Image
          src="/images/icons/download.svg"
          width={24}
          height={24}
          alt="attach"
        />
        Download Report
      </button>
      <PageWrapper>
        <div className="flex gap-2 mx-6 mb-6 mt-2">
          {yearsTab.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setActiveTab(item)}
                className={`${
                  activeTab.label === item.label
                    ? "text-grey-2 bg-white-3 font-semibold"
                    : "text-grey-5 bg-transparent font-medium"
                }  text-xs leading-[18px] rounded-lg px-4 py-2`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {isFetchingNwro || isFetchingUsers ? (
          <div className="flex flex-col pt-[40vh] items-center h-screen">
            <Spin size="large" className="custom-spin" />
          </div>
        ) : (
          <>
            <div className="p-4 mx-6 border-[1px] border-grey-4 rounded-lg bg-white shadow-custom-1 mb-4">
              <h2 className="text-xl text-grey-6 font-semibold mb-4">NWRO</h2>
              <Area
                {...nwroUsersGraphConfig}
                data={nwroData}
                loading={isFetchingNwro}
                // yAxis={{
                //   tickInterval: 1,
                // }}
                tooltip={{
                  marker: {
                    stroke: "#d0d5dd",
                    fill: "#334054",
                  },
                  customContent: (title: any, items: any) => {
                    return (
                      <div className="px-2 py-1">
                        <p className="text-sm text-grey-5">Week {title}</p>
                        {items.map((item: any) => (
                          <h2
                            key={item.value}
                            className="text-grey-6 text-sm font-semibold"
                          >
                            NWRO Sum: {item.value}
                          </h2>
                        ))}
                      </div>
                    );
                  },
                }}
              />
            </div>
            <div className="p-4 mx-6 border-[1.5px] border-grey-4 rounded-lg bg-white shadow-custom-1">
              <h2 className="text-xl text-grey-6 font-semibold mb-4">
                Unique Users
              </h2>
              <Area
                {...nwroUsersGraphConfig}
                data={usersData}
                loading={isFetchingUsers}
                // yAxis={{
                //   tickInterval: 1,
                // }}
                tooltip={{
                  marker: {
                    stroke: "#d0d5dd",
                    fill: "#334054",
                  },
                  customContent: (title: any, items: any) => {
                    return (
                      <div className="px-2 py-1">
                        <p className="text-sm text-grey-5">Week {title}</p>
                        {items.map((item: any) => (
                          <h2
                            key={item.value}
                            className="text-grey-6 text-sm font-semibold"
                          >
                            Users Sum: {item.value}
                          </h2>
                        ))}
                      </div>
                    );
                  },
                }}
              />
            </div>
          </>
        )}
      </PageWrapper>
      <div className="p-4 border-[1px] border-grey-4 rounded-lg bg-white shadow-custom-1 my-6">
        <h2 className="text-xl text-grey-6 font-semibold mb-4 -z-40 w-fit">
          Link Sharing Metrics
        </h2>
        <div className="flex mb-4 gap-5">
          <div className="flex flex-col space-y-2">
            <div className="bg-white-1 rounded-lg border-[1.5px] border-[#eaecf0] px-4 py-5 min-w-[280px]">
              <p className="text-grey-6 text-sm mb-1">Shares per user</p>
              <h2 className="text-grey-6 font-gosha text-2xl">78,902</h2>
            </div>
            <div className="bg-white-1 rounded-lg border-[1.5px] border-[#eaecf0] px-4 py-5 min-w-[280px]">
              <p className="text-grey-6 text-sm mb-1">Shares per supplier</p>
              <h2 className="text-grey-6 font-gosha text-2xl">78,902</h2>
            </div>
            <div className="bg-white-1 rounded-lg border-[1.5px] border-[#eaecf0] px-4 py-5 min-w-[280px]">
              <p className="text-grey-6 text-sm mb-1">Shares per product</p>
              <h2 className="text-grey-6 font-gosha text-2xl">78,902</h2>
            </div>
          </div>
          <div className="w-full h-[310px]">
            <Column
              {...usersGraphConfig}
              data={data2}
              yAxis={{
                tickInterval: 200,
              }}
              legend={{
                position: "top-right",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsOverview;
