/** @format */
"use client";
import { Drawer, Spin, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CloseButton from "@/components/CloseButton";
import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderDetailsBody from "./OrderDetailsBody";
import OrderDetailsActions from "./OrderDetailsActions";
import { invoiceItemsColumns } from "../util";
import { handleGetOrderInfo, handlePostMarkOrderAsComplete } from "../api";
import { formatAmount } from "@/utils";


const OrdersDrawer = () => {
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
    if (selectedRow && orderBreakdown==="false") {
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

  const markOrderAsComplete = async () => {
    setIsActionLoading(true);

    if (selectedRow)
      try {
        const orderStatus = await handlePostMarkOrderAsComplete(selectedRow);
        if (orderStatus.message.includes("error")) {
          return message.error(orderStatus.message);
        }

        message.success(orderStatus.message);
        replace(`${pathname}?tab=successful`);
        setOpen(false);
      } catch (error) {
        console.log(122, error);
      } finally {
        setIsActionLoading(false);
      }
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
        <>
          <OrderDetailsHeader
            activeTab={activeTab}
            orderNo={orderInfo.key}
            deliveryDate={orderInfo.deliveryDate}
          />
          <OrderDetailsBody
            producerName={orderInfo.producerName}
            producerAddress={orderInfo.producerAddress}
            producerVat={orderInfo.producerVat}
            orderNo={orderInfo.key}
            createdAt={orderInfo.createdAt}
            producerPaymentTerm={orderInfo.producerPaymentTerm}
            producerPaymentDue={orderInfo.producerPaymentDue}
            hostName={orderInfo.hostName}
            hostAddress={orderInfo.hostAddress}
          >
            <div className="mt-6">
              <Table
                columns={invoiceItemsColumns}
                dataSource={orderInfo.productLog}
                pagination={false}
                className="custom-table-invoice borderless bg-white-1"
              />
              {orderInfo.productLog?.length > 0 && (
                <div className="flex flex-col mt-8 ml-auto w-[185px] -mr-2.5">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-[10px] text-grey-5 font-semibold leading-[15px]">
                      Subtotal
                    </p>
                    <h2 className="text-grey-2 text-xs font-bold font-gosha leading-[15px]">
                      {formatAmount(sums?.totalExVatSum)}
                    </h2>
                  </div>
                  <hr className="border-0 border-t-[1px] border-grey-4 mt-2 mb-2.5" />
                  <div className="flex justify-between items-center w-full">
                    <p className="text-[10px] text-grey-5 font-semibold leading-[15px]">
                      VAT
                    </p>
                    <h2 className="text-grey-2 text-xs font-bold font-gosha leading-[15px]">
                      {formatAmount(sums?.vatSum)}
                    </h2>
                  </div>
                  <hr className="border-0 border-t-[1px] border-grey-4 mt-2" />
                  <div className="flex justify-between items-center w-full mt-6">
                    <p className="text-sm text-grey-5 font-semibold leading-5">
                      Total
                    </p>
                    <h2 className="text-grey-6 text-xl font-bold font-gosha leading-[15px]">
                      {formatAmount(sums?.totalExVatSum + sums?.vatSum)}
                    </h2>
                  </div>
                  <hr className="border-0 border-t-[1px] border-grey-4 mt-2 mb-1" />
                  <hr className="border-0 border-t-[1px] border-grey-4" />
                </div>
              )}
              <div className="mt-5">
                <p className="text-[9px] font-semibold leading-[9px]e text-grey-6">
                  Postcode Collective LTD (Trading as Rabble)
                </p>
                <p className="text-[9px] font-semibold leading-[9px] text-grey-6">
                  Company number: 14712713
                </p>
              </div>
            </div>
          </OrderDetailsBody>
          <OrderDetailsActions
            activeTab={activeTab}
            isActionLoading={isActionLoading}
            onMarkOrderAsComplete={markOrderAsComplete}
          />
        </>
      )}
    </Drawer>
  );
};

export default OrdersDrawer;
