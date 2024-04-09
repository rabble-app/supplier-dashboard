/** @format */

"use client";
import { Dropdown, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ISubscriptionsData } from "../interfaces";

interface IOrdersTable {
  pageSize: number;
  columns: ColumnsType<any>;
  data: any;
  total: number;
  loadingOrders?: boolean;
  loadingSubscriptions?: boolean;
  locale?: any;
  pagination?: boolean;
}

const OrdersTable = ({
  pageSize,
  columns,
  data,
  total,
  loadingOrders,
  loadingSubscriptions,
  locale,
  pagination,
}: IOrdersTable) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(`${searchParams}`);

  const handlePaginationChange = (page: number) => {
    params.set("page", page.toString());
    params.get("selected-row") && params.delete("selected-row");

    replace(`${pathname}?${params.toString()}`);
  };

  const handleClick = async (
    id: string,
    producerId: string,
    orderBreakdown: boolean = false
  ) => {
    params.set("selected-row", id);
    params.set("producer-id", producerId);
    params.set("order-breakdown", String(orderBreakdown));

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updatedColumns: ColumnsType<ISubscriptionsData> = [
    ...columns,
    {
      title: " ",
      key: "",
      render: (_, record) => (
        <Space size="middle" onClick={(e) => e.stopPropagation()}>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <p className="py-3.5 text-base font-medium flex gap-2">
                      <Image
                        src="/images/icons/note.svg"
                        width={24}
                        height={24}
                        alt="note"
                      />
                      View more details
                    </p>
                  ),
                  onClick: () => handleClick(record.key, record.producerId),
                },
                {
                  key: "2",
                  label: (
                    <p className="py-3.5 text-base font-medium flex gap-2">
                      <Image
                        src="/images/icons/note.svg"
                        width={24}
                        height={24}
                        alt="note"
                      />
                      View order breakdown
                    </p>
                  ),
                  onClick: () =>
                    handleClick(record.key, record.producerId, true),
                },
              ],
            }}
          >
            <Image
              src="/images/icons/more.svg"
              width={24}
              height={24}
              alt="more-icon"
              className={
                ["subscriptions", ""].includes(params.get("tab") || "")
                  ? "pointer-events-none hidden"
                  : ""
              }
            />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={updatedColumns}
      dataSource={data}
      loading={loadingOrders || loadingSubscriptions}
      locale={locale}
      pagination={
        pagination && {
          position: ["bottomCenter"],
          pageSize,
          total,
          onChange: handlePaginationChange,
          current: Number(params.get("page")) || 1,
        }
      }
      className="mt-9 custom-table borderless overflow-scroll"
    />
  );
};

export default OrdersTable;
