/** @format */

import OrderBreakdownDrawer from "./components/OrderBreakdownDrawer";
import OrdersDrawer from "./components/OrdersDrawer";
import OrdersOverview from "./components/OrdersOverview";
 
const Orders = () => {
  return (
    <>
      <OrdersOverview />
      <OrdersDrawer />
      <OrderBreakdownDrawer />
    </>
  );
};

export default Orders;
