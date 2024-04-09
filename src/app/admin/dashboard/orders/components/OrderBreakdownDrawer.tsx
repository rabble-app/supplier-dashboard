/** @format */
"use client";
import { Drawer, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CloseButton from "@/components/CloseButton";
import { handleGetOrderInfo } from "../api";
import { formatAmount } from "@/utils";

const items = [
  {
    name: "Maxwell Beard",
    postcode: "SW2 5JD",
    host: true,
    basket: [
      {
        productName: "Box of gino marche",
        quantity: "4",
        amount: "£ 288.00",
      },
      {
        productName: "Coffee ground",
        quantity: "4",
        amount: "£ 80.00",
      },
      {
        productName: "Box 120 eggs",
        quantity: "4",
        amount: "£ 160.00",
      },
    ],
  },
  {
    name: "Alex Johnson",
    postcode: "NW1 6XE",
    host: false,
    basket: [
      {
        productName: "Organic honey",
        quantity: "2",
        amount: "£ 45.00",
      },
      {
        productName: "Almond milk",
        quantity: "5",
        amount: "£ 15.00",
      },
      {
        productName: "Fresh avocados",
        quantity: "10",
        amount: "£ 30.00",
      },
    ],
  },
  {
    name: "Samantha Ray",
    postcode: "SE1 9SG",
    host: false,
    basket: [
      {
        productName: "Artisan bread",
        quantity: "3",
        amount: "£ 12.00",
      },
      {
        productName: "Blue cheese",
        quantity: "2",
        amount: "£ 20.00",
      },
      {
        productName: "Cherry tomatoes",
        quantity: "5",
        amount: "£ 10.00",
      },
    ],
  },
];

const OrderBreakdownDrawer = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>({});

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(`${searchParams}`);
  const selectedRow = params.get("selected-row");
  const producerId = params.get("producer-id");
  const orderBreakdown = params.get("order-breakdown");
  const activeTab = params.get("tab") ?? "subscriptions";

  useEffect(() => {
    if (selectedRow && orderBreakdown === "true") {
      setOpen(true);
      getOrderInfo(selectedRow);
    } else {
      setOrderInfo({});
    }
    // eslint-disable-next-line
  }, [selectedRow, activeTab, orderBreakdown]);

  const getOrderInfo = async (id: string) => {
    setIsLoading(true);
    try {
      const orderInfo = await handleGetOrderInfo(id, producerId);
      setOrderInfo(orderInfo.data);
    } catch (error) {
      console.log(122, error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    params.delete("selected-row");
    params.delete("producer-id");
    params.delete("order-breakdown");
    setOpen(false);

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const sums = orderInfo?.productLog?.reduce(
    (acc: any, item: any) => {
      acc.totalExVatSum += Number(item.totalExVat);
      acc.vatSum += Number(item.vat);
      return acc;
    },
    { totalExVatSum: 0, vatSum: 0 }
  );

  return (
    <Drawer
      closeIcon={<CloseButton className="absolute right-5 top-5" />}
      placement="right"
      onClose={onClose}
      open={open}
      key={selectedRow}
      width={710}
      className="relative px-5 pt-14 custom-drawer"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[90vh] pb-20">
          <Spin size="large" className="custom-spin" />
        </div>
      ) : (
        <div className="overflow-y-scroll">
          <h1 className="font-gosha text-[32px] leading-10 mb-2">
            Order Breakdown
          </h1>
          <p className="text-sm leading-6 font-poppins text-grey-2 mb-4">
            View an order breakdown
          </p>

          <div>
            <div className="border-[1.5px] rounded-t-lg border-[#eaeaea] flex items-center justify-between bg-white-2 py-4">
              <ul className="flex gap-7 pl-4">
                <li className="text-grey-7 font-gosha font-semibold mr-6">
                  Member name
                </li>
                <li className="text-grey-7 font-gosha font-semibold">
                  Postcode
                </li>
                <li className="text-grey-7 font-gosha font-semibold">
                  Product name
                </li>
              </ul>
              <ul className="flex gap-7 pr-10">
                <li className="text-grey-7 font-gosha font-semibold">
                  Quantity
                </li>
                <li className="text-grey-7 font-gosha font-semibold">
                  Total Inc VAT
                </li>
              </ul>
            </div>
            <div className="bg-white-1 border-[1.5px] border-t-0 border-[#eaeaea] rounded-b-lg">
              {items.map((item, i) => (
                <>
                  <div
                    key={i}
                    className="py-4 pl-4 pr-10 flex items-start justify-between"
                  >
                    <div className="flex w-[400px]">
                      <div className="text-grey-5 text-[10px] w-full">
                        {item.name}{" "}
                        {item.host ? (
                          <span className="text-blue-1 ml-2.5">Host</span>
                        ) : null}
                      </div>
                      <div className="text-grey-5 text-[10px] w-[60%]">
                        {item.postcode}
                      </div>
                    </div>
                    <div className="w-full">
                      {item.basket.map((product, j) => (
                        <div key={j} className="w-full">
                          <div className="flex justify-between items-center w-full">
                            <p className="text-grey-5 text-[10px] uppercase w-full">
                              {product.productName}
                            </p>
                            <p className="text-grey-5 text-[10px] text-end w-full">
                              X{product.quantity}
                            </p>
                            <p className="text-grey-5 text-[10px] text-end w-full -ml-1.5">
                              {product.amount}
                            </p>
                          </div>
                          {j < items.length - 1 && (
                            <hr className="border-[#eaeaea] border-t-[1.5px] my-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {i < items.length - 1 && (
                    <hr className="border-grey-4 border-t-[1.5px] my-2 ml-4 mr-10" />
                  )}
                </>
              ))}
              <div className="flex flex-col mt-4 ml-auto w-[250px] pr-10 pb-10">
                <div className="flex justify-between items-center w-full">
                  <p className="text-[10px] text-grey-5 font-semibold leading-[15px]">
                    Subtotal
                  </p>
                  <h2 className="text-grey-2 text-xs font-bold font-gosha leading-[15px]">
                    {formatAmount("484")}
                  </h2>
                </div>
                <hr className="border-0 border-t-[1px] border-grey-4 mt-2 mb-2.5" />
                <div className="flex justify-between items-center w-full">
                  <p className="text-[10px] text-grey-5 font-semibold leading-[15px]">
                    VAT
                  </p>
                  <h2 className="text-grey-2 text-xs font-bold font-gosha leading-[15px]">
                    {formatAmount("240")}
                  </h2>
                </div>
                <hr className="border-0 border-t-[1px] border-grey-4 mt-2" />
                <div className="flex justify-between items-center w-full mt-6">
                  <p className="text-sm text-grey-5 font-semibold leading-5">
                    Total
                  </p>
                  <h2 className="text-grey-6 text-xl font-bold font-gosha leading-[15px]">
                    {formatAmount("724")}
                  </h2>
                </div>
                <hr className="border-0 border-t-[1px] border-grey-4 mt-2 mb-1" />
                <hr className="border-0 border-t-[1px] border-grey-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default OrderBreakdownDrawer;
