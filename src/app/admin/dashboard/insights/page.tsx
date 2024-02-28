/** @format */
"use client";
import { useState } from "react";
import { Area, Column } from "@ant-design/plots";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";

const data = [
  {
    timePeriod: "1",
    value: 3.8,
  },
  {
    timePeriod: "2",
    value: 2,
  },
  {
    timePeriod: "3",
    value: 5.1,
  },
  {
    timePeriod: "4",
    value: 5.9,
  },
  {
    timePeriod: "5",
    value: 4.9,
  },
  {
    timePeriod: "6",
    value: 4.5,
  },
  {
    timePeriod: "7",
    value: 7.2,
  },
];

const data2 = [
  { name: "Shares per app", username: "Username 1", value: 331.68 },
  { name: "Shares per app", username: "Username2", value: 547.61 },
  { name: "Shares per app", username: "Username 3", value: 403.37 },
  { name: "Shares per app", username: "Username 4", value: 631.8 },
  { name: "Shares per app", username: "Username 5", value: 761.63 },
  { name: "Shares per app", username: "Username 6", value: 182.65 },
  { name: "Shares per app", username: "Username 7", value: 132.62 },
  { name: "Shares per supplier", username: "Username 1", value: 649.56 },
  { name: "Shares per supplier", username: "Username2", value: 388.69 },
  { name: "Shares per supplier", username: "Username 3", value: 701.0 },
  { name: "Shares per supplier", username: "Username 4", value: 686.52 },
  { name: "Shares per supplier", username: "Username 5", value: 362.47 },
  { name: "Shares per supplier", username: "Username 6", value: 500.5 },
  { name: "Shares per supplier", username: "Username 7", value: 397.04 },
  { name: "Shares per product", username: "Username 1", value: 543.58 },
  { name: "Shares per product", username: "Username2", value: 434.74 },
  { name: "Shares per product", username: "Username 3", value: 573.21 },
  { name: "Shares per product", username: "Username 4", value: 971.57 },
  { name: "Shares per product", username: "Username 5", value: 159.62 },
  { name: "Shares per product", username: "Username 6", value: 140.98 },
  { name: "Shares per product", username: "Username 7", value: 564.92 },
];

const config = {
  data,
  xField: "timePeriod",
  yField: "value",
  smooth: false,
  height: 400,
  xAxis: {
    range: [0, 1],
  },
  yAxis: {
    range: [0, 1],
  },
  areaStyle: {
    fill: "l(270) 0:#ffffff 0.5:#D6F318 1:#D6F318",
    stroke: "transparent",
    size: 0.3,
  },
  animate: true,
  line: {
    color: "#9db401",
    size: 0.3,
    state: {
      active: {
        style: {
          color: "#9db401",
          lineWidth: 0.3,
        },
      },
    },
  },
  point: {
    shape: "circle",
    size: 4,
    style: {
      stroke: "#d0d5dd",
      fill: "#334054",
    },

    state: {
      active: {
        style: {
          stroke: "#d0d5dd",
          fill: "#334054",
        },
      },
    },
  },
  interactions: [
    { type: "element-active" },
    { type: "element-highlight-by-x" },
  ],
};

const config2 = {
  data: data2,
  isGroup: true,
  xField: "username",
  animate: true,
  yField: "value",
  seriesField: "name",
  color: ["#FFD11A", "#027A48", "#18AEF9"],
  marginRatio: 0,
  interactions: [{ type: "element-highlight", enable: false}],
  tooltip: {
    shared: false,
    customContent: (title: any, items: any) => {
      return (
        <div className="p-2">
          <p className="text-xs text-grey-5">{title}</p>
          {items.map((item: any) => {
            if (item.name === "Shares per app") {
              return (
                <h3 key={item.name} className="text-grey-6 text-sm font-medium">
                  120 shares
                </h3>
              );
            } else if (item.name === "Shares per supplier") {
              return (
                <>
                  <div className="flex gap-1.5 items-center">
                    <h3 className="text-grey-6 text-sm font-medium">Supplier 01</h3>
                    <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
                    <p className="text-grey-5 text-xs">50</p>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <h3 className="text-grey-6 text-sm font-medium">Supplier 02</h3>
                    <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
                    <p className="text-grey-5 text-xs">50</p>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <h3 className="text-grey-6 text-sm font-medium">Supplier 03</h3>
                    <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
                    <p className="text-grey-5 text-xs">50</p>
                  </div>
                  <div className="flex gap-1.5 items-center">
                    <h3 className="text-grey-6 text-sm font-medium">Supplier 04</h3>
                    <span className="w-2 h-2 rounded-full bg-[#027a48] inline-block" />
                    <p className="text-grey-5 text-xs">50</p>
                  </div>
                </>
              );
            }
            return (
              <>
              <div className="flex gap-1.5 items-center">
                <h3 className="text-grey-6 text-sm font-medium">Product 01</h3>
                <span className="w-2 h-2 rounded-full bg-[#18AEF9] inline-block" />
                <p className="text-grey-5 text-xs">50</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <h3 className="text-grey-6 text-sm font-medium">Product 02</h3>
                <span className="w-2 h-2 rounded-full bg-[#18AEF9] inline-block" />
                <p className="text-grey-5 text-xs">50</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <h3 className="text-grey-6 text-sm font-medium">Product 03</h3>
                <span className="w-2 h-2 rounded-full bg-[#18AEF9] inline-block" />
                <p className="text-grey-5 text-xs">50</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <h3 className="text-grey-6 text-sm font-medium">Product 04</h3>
                <span className="w-2 h-2 rounded-full bg-[#18AEF9] inline-block" />
                <p className="text-grey-5 text-xs">50</p>
              </div>
            </>
            );
          })}
        </div>
      );
    }
  },
};

const Insights = () => {
  const [active, setActive] = useState("1 Year");

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
          {["1 Year", "2 Years", "3 Years", "4 Years"].map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setActive(item)}
                className={`${
                  active === item
                    ? "text-grey-2 bg-white-3 font-semibold"
                    : "text-grey-5 bg-transparent font-medium"
                }  text-xs leading-[18px] rounded-lg px-4 py-2`}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="p-4 mx-6 border-[1px] border-grey-4 rounded-lg bg-white shadow-custom-1 mb-4">
          <h2 className="text-xl text-grey-6 font-semibold mb-4">NWRO</h2>
          <Area
            {...config}
            yAxis={{
              tickInterval: 1,
            }}
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
            {...config}
            yAxis={{
              tickInterval: 1,
            }}
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
              {...config2}
              yAxis={{
                tickInterval: 200,
              }}
              legend={{
                position: "top-right",
              }}
              // tooltip={{
              //   shared: false,
              //   customContent: (title: any, items: any) => {
              //     console.log(title, items);
              //     return (
              //       <div className="px-2 py-1">
              //         <p className="text-sm text-grey-5">Week {title}</p>
              //         {items.map((item: any) => (
              //           <h2
              //             key={item.value}
              //             className="text-grey-6 text-sm font-semibold"
              //           >
              //             Users Sum: {item.value}
              //           </h2>
              //         ))}
              //       </div>
              //     );
              //   },
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
