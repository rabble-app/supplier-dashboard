/** @format */

import { invoiceItemsColumns } from './util';
import OrdersDrawer from './components/OrdersDrawer';
import { handleGetOrders, handleGetSubscriptions } from './api';
import OrdersOverview from './components/OrdersOverview';

const Orders = async ({
  searchParams,
}: {
  searchParams?: {
    tab?: string;
    page?: string;
    query?: string;
    'selected-row'?: string;
  };
}) => {
  const activeTab = searchParams?.tab || 'subscriptions';
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';

  const orders = await handleGetOrders(currentPage, activeTab, query);
  const subscriptions = await handleGetSubscriptions(currentPage, query);

  return (
    <>
      <OrdersOverview
        activeTab={activeTab}
        pageSize={7}
        subscriptions={subscriptions}
        orders={orders}
      />

      <OrdersDrawer invoiceItemsColumns={invoiceItemsColumns} />
    </>
  );
};

export default Orders;
