/** @format */
"use client";
import { ordersColumns, subscriptionColumns } from "../util";
import { ITabConfig } from "../interfaces";
import Tabs from "@/components/Tabs";
import SearchInput from "@/components/SearchInput";
import OrdersTable from "./OrdersTable";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  handleGetOrderStatusCount,
  handleGetOrders,
  handleGetSubscriptions,
} from "../api";
import Image from "next/image";

const OrdersOverview = () => {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  const activeTab = searchParams.get("tab") || "subscriptions";

  const { data: subscriptionsData, isFetching: isFetchingSubscriptions } =
    useQuery({
      queryKey: ["subscriptions", currentPage, query],
      queryFn: () => handleGetSubscriptions(currentPage, query),
      enabled: activeTab === "subscriptions",
    });

  const { data: ordersData, isFetching:isFetchingOrders } = useQuery({
    queryKey: ["orders", currentPage, activeTab, query],
    queryFn: () =>  handleGetOrders(currentPage, activeTab, query),
    enabled: activeTab !== "subscriptions",
  });

  const { data: ordersStatusCountData } = useQuery({
    queryKey: ["ordersStatusCount", activeTab],
    queryFn: handleGetOrderStatusCount,
  });

  const getOrdersTabConfig = (count: number) => ({
    columns: ordersColumns,
    data: ordersData?.data?.[1],
    total: count,
  });

  const tabConfig: ITabConfig = {
    subscriptions: {
      columns: subscriptionColumns,
      data: subscriptionsData?.data?.[1],
      total: subscriptionsData?.data?.[0],
    },
    "pending-orders": getOrdersTabConfig(ordersStatusCountData?.data?.[0]),
    "pending-delivery": getOrdersTabConfig(ordersStatusCountData?.data?.[1]),
    successful: getOrdersTabConfig(ordersStatusCountData?.data?.[2]),
    failed: getOrdersTabConfig(ordersStatusCountData?.data?.[3]),
  };

  const tabItems = [
    "subscriptions",
    "pending-orders",
    "pending-delivery",
    "successful",
    "failed",
  ].map((name, i) => ({
    name,
    quantity:
      name === "subscriptions" ? null : ordersStatusCountData?.data[i - 1] || 0,
  }));

  const activeTabConfig = tabConfig[activeTab] || {};

  const { columns, data, total } = activeTabConfig;

  let heading;
  let subtitle;

  if(activeTab === "subscriptions") {
    heading = "No subscriptions";
    subtitle = "It seems that you currently don't have any subscriptions from teams.";
  }else if(activeTab === "pending-orders") {
    heading = "No pending orders";
    subtitle = "It seems that you currently don't have any upcoming orders.";
  }else if(activeTab === "successful") {
    heading = "No completed orders";
    subtitle = "It seems that you currently haven’t completed any order in the past";
  }else if(activeTab === "late") {
    heading = "No late orders";
    subtitle = "It seems that you are doing a great job.";
  }


  let locale = {
    emptyText: (
      <div className="py-[70px] text-center">
        <Image
          src="/images/Orders.png"
          className="mx-auto"
          width={273}
          height={185}
          alt="no-data"
        />
        <div className="flex flex-col gap-2 mt-8">
          <h2 className="font-gosha font-bold text-[32px] leading-[38px] text-grey-6">
            {heading}
          </h2>
          <p className="leading-6 text-sm text-grey-5">
            {subtitle}
          </p>
        </div>
      </div>
    ),
  };


  return (
    <div className="pt-8">
      <PageHeader
        title="Orders"
        subtitle="Keep track of team orders and their status."
        count={subscriptionsData?.data?.[0] || 0}
        label="orders"
      />
      <PageWrapper>
        <div className="flex justify-between items-center gap-[190px] px-4">
          <Tabs items={tabItems} activeTab={activeTab} />
          <div className="w-1/3">
            <SearchInput key={activeTab} placeholder="Search" />
          </div>
        </div>

        <OrdersTable
          pageSize={7}
          columns={columns}
          data={data}
          total={total}
          loadingOrders={isFetchingOrders}
          loadingSubscriptions={isFetchingSubscriptions}
          locale={locale}
        />
      </PageWrapper>
    </div>
  );
};

export default OrdersOverview;
