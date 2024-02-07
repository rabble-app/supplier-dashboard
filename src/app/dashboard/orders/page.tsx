/** @format */

import OrdersDrawer from "@/app/admin/dashboard/orders/components/OrdersDrawer";
import OrdersOverview from "@/app/admin/dashboard/orders/components/OrdersOverview";

 
const Orders = () => {
  return (
    <>
      <OrdersOverview />
      <OrdersDrawer />
    </>
  );
};

export default Orders;
