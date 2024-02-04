/** @format */

import { invoiceItemsColumns } from "./util";
import OrdersDrawer from "./components/OrdersDrawer";
import OrdersOverview from "./components/OrdersOverview";

const Orders = async ({
  searchParams,
}: {
  searchParams?: {
    tab?: string;
    "selected-row"?: string;
  };
}) => {
  const activeTab = searchParams?.tab || "subscriptions";

  return (
    <>
      <OrdersOverview activeTab={activeTab} pageSize={7} />
      <OrdersDrawer invoiceItemsColumns={invoiceItemsColumns} />
    </>
  );
};

export default Orders;
