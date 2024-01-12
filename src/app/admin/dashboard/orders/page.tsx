/** @format */
"use server";
import { invoiceItemsColumns } from "./util";
import OrdersDrawer from "./components/OrdersDrawer";
import {
  handleGetOrderStatusCount,
  handleGetOrders,
  handleGetSubscriptions,
} from "./api";
import OrdersOverview from "./components/OrdersOverview";

const Orders = async ({
  searchParams,
}: {
  searchParams?: {
    tab?: string;
    page?: string;
    query?: string;
    "selected-row"?: string;
  };
}) => {
  const activeTab = searchParams?.tab || "subscriptions";
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  const orders = await handleGetOrders(currentPage, activeTab, query);
  const ordersStatusCount = await handleGetOrderStatusCount();
  const subscriptions = await handleGetSubscriptions(currentPage, query);

  return (
    <>
      <OrdersOverview
        activeTab={activeTab}
        pageSize={7}
        subscriptions={subscriptions}
        orders={orders}
        ordersStatusCount={ordersStatusCount}
      />

      <OrdersDrawer invoiceItemsColumns={invoiceItemsColumns} />
    </>
  );
};

export default Orders;
