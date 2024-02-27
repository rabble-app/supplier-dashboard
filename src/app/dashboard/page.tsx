/** @format */
"use client";

import { useState } from "react";
import { Dropdown, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useRouter } from "next/navigation";

import LeftSection from "./home/components/LeftSection";
import MainHeading from "./home/components/MainHeading";
import Button from "@/components/Button";
import PageWrapper from "@/components/PageWrapper";
import OrdersTable from "./orders/components/OrdersTable";
import { capitalizeFirstLetter, formatAmount } from "@/utils";
import { getStatusClass } from "./orders/util";
import Stripe from "./home/components/Stripe";
import NoData from "./home/components/NoData";
import TeamSectionDrawer from "./home/components/TeamSectionDrawer";
import SupplierDetailsDrawer from "./home/components/SupplierDetailsDrawer";

interface OrdersType {
  key: string;
  address: string;
  frequency: string;
  orderValue: number;
  delivery: string;
  orderStatus: string;
}

const data: OrdersType[] = [
  {
    key: "1",
    address: "123 Elm St",
    frequency: "Weekly",
    orderValue: 150,
    delivery: "22 June 2023",
    orderStatus: "Pending",
  },
  {
    key: "2",
    address: "456 Maple Ave",
    frequency: "Monthly",
    orderValue: 200,
    delivery: "22 June 2023",
    orderStatus: "Pending",
  },
  {
    key: "3",
    address: "789 Oak Rd",
    frequency: "Bi-Weekly",
    orderValue: 100,
    delivery: "22 June 2023",
    orderStatus: "Successful",
  },
  {
    key: "4",
    address: "101 Pine St",
    frequency: "One-Time",
    orderValue: 250,
    delivery: "22 June 2023",
    orderStatus: "Pending",
  },
  {
    key: "5",
    address: "202 Birch Ln",
    frequency: "Weekly",
    orderValue: 175,
    delivery: "22 June 2023",
    orderStatus: "Successful",
  },
];

const Dashboard = () => {
  const [stripeClicked, setStripeClicked] = useState("stripe");
  const [openTeamDrawer, setOpenTeamDrawer] = useState(false);
  const [openSupplierDrawer, setOpenSupplierDrawer] = useState(false);

  const router = useRouter();

  const columns: ColumnsType<OrdersType> = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <p>{text || "N/A"}</p>,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      render: (text) => <p className="capitalize">{text}</p>,
    },
    {
      title: "Order value",
      dataIndex: "orderValue",
      key: "orderValue",
      render: (text) => (
        <span className="bg-[#00FF0A1A] text-green-1 leading-[18px] text-xs py-1 px-2 rounded-[100px]">
          {formatAmount(text)}
        </span>
      ),
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      key: "delivery",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text) => {
        let displayText = text.toLowerCase();
        if (displayText === "pending_delivery") {
          displayText = "pending Delivery";
        }
        return (
          <span
            className={`${getStatusClass(
              capitalizeFirstLetter(displayText)
            )} leading-[18px] text-xs py-1 px-2 rounded-[100px] capitalize`}
          >
            {displayText}
          </span>
        );
      },
    },
    {
      title: " ",
      key: "",
      render: (_, record) => (
        <Space size="middle" onClick={(e) => e.stopPropagation()}>
          <Dropdown
            menu={{
              items: [
                {
                  key: record.key,
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
                  onClick: () => setOpenTeamDrawer(true),
                },
              ],
            }}
          >
            <Image
              src="/images/icons/more.svg"
              width={24}
              height={24}
              alt="more-icon"
            />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex h-screen gap-5">
        <LeftSection onClick={() => setOpenSupplierDrawer(true)} />
        <div className="bg-white h-full w-full py-8 px-5 relative">
          <MainHeading
            date="Friday, 2nd June"
            message="Hi Farm2Door, welcome back"
          />

          {stripeClicked === "stripe" ? (
            <div onClick={() => setStripeClicked("no orders")}>
              <Stripe />
            </div>
          ) : null}
          {stripeClicked === "no orders" ? (
            <div onClick={() => setStripeClicked("table")}>
              <NoData />
            </div>
          ) : null}
          {stripeClicked === "table" ? (
            <>
              <PageWrapper>
                <div className="flex justify-between items-center px-4">
                  <h2 className="text-grey-2 text-xl font-gosha font-bold">
                    Recent Activity
                  </h2>
                  <Button
                    label="View All Orders"
                    size="md"
                    className="h-10"
                    onClick={() => router.push("/dashboard/orders")}
                  />
                </div>

                <OrdersTable
                  pageSize={7}
                  columns={columns}
                  data={data}
                  total={7}
                  pagination={false}
                  isHome={true}
                />
              </PageWrapper>
            </>
          ) : null}
        </div>
      </div>
      <TeamSectionDrawer open={openTeamDrawer} setOpen={setOpenTeamDrawer} />
      <SupplierDetailsDrawer
        open={openSupplierDrawer}
        setOpen={setOpenSupplierDrawer}
      />
    </>
  );
};

export default Dashboard;
