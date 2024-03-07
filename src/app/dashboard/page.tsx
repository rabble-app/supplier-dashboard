/** @format */
"use client";

import { useState } from "react";
import { Dropdown, Space, message } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

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
import {
  handleGetCurrentProducer,
  handleGetRecentOrders,
  handleUpdateProducer,
  handleUpdateProducerCategories,
} from "./home/api";
import { useAppSelector } from "@/redux/store";
import {
  handleAddProducerCategories,
  handleGetProducerCategories,
} from "@/actions/authActions";
import OrdersDrawer from "../admin/dashboard/orders/components/OrdersDrawer";

export interface OrdersType {
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
  const [stripeClicked, setStripeClicked] = useState("table");
  const [openSupplierDrawer, setOpenSupplierDrawer] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useAppSelector((state) => state.authReducer);
  const token = localStorage.token;

  const queryClient = useQueryClient();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: () => handleGetRecentOrders(),
  });

  const {
    data: categoriesData,
    isFetching: isFetchingCategories,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => handleGetProducerCategories(token),
  });

  const {
    data: producerData,
    isFetching: isFetchingProducer,
    isError: isProducerError,
  } = useQuery({
    queryKey: ["current-producer"],
    queryFn: () => handleGetCurrentProducer(authUser?.id),
  });

  const updateCategories = async (categoryIds: string[]) => {
    const preparedData = categoryIds.map((catId) => {
      return {
        producerId: authUser?.id,
        producerCategoryOptionId: catId,
      };
    });

    console.log(22, categoryIds)

    setIsUpdating(true);
    try {
      const result = await handleUpdateProducerCategories(preparedData);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }

      message.success(result.message);
      await queryClient.refetchQueries({ queryKey: ["current-producer"] });
    } catch (error: any) {
      const errorObject = JSON.parse(error.message);
      message.error(errorObject.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const updateProducer = async (fieldName: string, value: string | number) => {
    const loadingKey = "loading";
    message.loading({
      content: "Updating producer...",
      key: loadingKey,
    });

    try {
      const data = { [fieldName]: value };
      const res = await handleUpdateProducer(authUser?.id, data);

      if (res.statusCode === 400 || res.statusCode === 500) {
        throw new Error(JSON.stringify(res));
      } else {
        message.success("Producer updated successfully");
        await queryClient.refetchQueries({ queryKey: ["current-producer"] });
      }
    } catch (error) {
      message.error("Error updating producer");
    } finally {
      message.destroy(loadingKey);
    }
  };

  const router = useRouter();

  if (isProducerError || isError || isCategoriesError)
    return <div>Error...</div>;

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
  ];

  return (
    <>
      <div className="flex h-screen gap-5">
        <LeftSection
          producerData={producerData}
          onClick={() => setOpenSupplierDrawer(true)}
        />
        <div className="bg-white h-full w-full py-8 px-5 relative">
          <MainHeading
            date={dayjs(new Date()).format("dddd, D MMMM")}
            message={`Hi ${producerData?.businessName}, welcome back`}
          />

          {/* {stripeClicked === "stripe" ? (
            <div onClick={() => setStripeClicked("no orders")}>
              <Stripe />
            </div>
          ) : null} */}
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
                  loading={isFetching}
                  total={7}
                  pagination={false}
                  isHome={true}
                />
              </PageWrapper>
            </>
          ) : null}
        </div>
      </div>
      <OrdersDrawer />
      <SupplierDetailsDrawer
        open={openSupplierDrawer}
        setOpen={setOpenSupplierDrawer}
        producerData={producerData}
        categoriesData={categoriesData?.data}
        updateProducer={updateProducer}
        updateCategories={updateCategories}
        isUpdating={isUpdating}
      />
    </>
  );
};

export default Dashboard;
