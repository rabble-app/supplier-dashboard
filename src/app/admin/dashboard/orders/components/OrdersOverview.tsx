/** @format */
"use client";
import { message } from "antd";

import { ordersColumns, subscriptionColumns } from "../util";
import { ITabConfig } from "../interfaces";
import Tabs from "@/components/Tabs";
import SearchInput from "@/components/SearchInput";
import OrdersTable from "./OrdersTable";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";

interface IOrdersOverview {
  activeTab: string;
  pageSize: number;
  orders: any;
  ordersStatusCount: any;
  subscriptions: any;
}

const OrdersOverview = ({
  activeTab,
  pageSize,
  orders,
  ordersStatusCount,
  subscriptions,
}: IOrdersOverview) => {
  const {
    data: subscriptionsData,
    error: subscriptionsError,
    message: subscriptionsMessage,
  } = subscriptions;
  const {
    data: ordersData,
    error: ordersError,
    message: ordersMessage,
  } = orders;
  const {
    data: ordersStatusCountData,
    error: ordersStatusCountError,
    message: ordersStatusCountMessage,
  } = ordersStatusCount;

  if (activeTab === "subscriptions" && subscriptionsError) {
    message.error(subscriptionsMessage);
  }
  if (activeTab !== "subscriptions" && ordersError) {
    message.error(ordersMessage);
  }
  if (ordersStatusCountError) {
    message.error(ordersStatusCountMessage);
  }

  const getOrdersTabConfig = (count: number) => ({
    columns: ordersColumns,
    data: ordersData?.[1],
    total: count,
  });

  const tabConfig: ITabConfig = {
    subscriptions: {
      columns: subscriptionColumns,
      data: subscriptionsData?.[1],
      total: subscriptionsData?.[0],
    },
    "pending-orders": getOrdersTabConfig(ordersStatusCountData[0]),
    "pending-delivery": getOrdersTabConfig(ordersStatusCountData[1]),
    successful: getOrdersTabConfig(ordersStatusCountData[2]),
    failed: getOrdersTabConfig(ordersStatusCountData[3]),
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
      name === "subscriptions" ? null : ordersStatusCountData[i - 1] || 0,
  }));

  const activeTabConfig = tabConfig[activeTab] || {};

  const { columns, data, total } = activeTabConfig;

  return (
    <div className="pt-8">
      <PageHeader
        title="Orders"
        subtitle="Keep track of team orders and their status."
        count={subscriptionsData?.[0] || 0}
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
          pageSize={pageSize}
          columns={columns}
          data={data}
          total={total}
        />
      </PageWrapper>
    </div>
  );
};

export default OrdersOverview;
