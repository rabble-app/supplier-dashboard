/** @format */
'use client';
import { Drawer, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CloseButton from '@/components/CloseButton';
import OrderDetailsHeader from './OrderDetailsHeader';
import OrderDetailsBody from './OrderDetailsBody';
import OrderDetailsActions from './OrderDetailsActions';
import { IInvoiceItemsData } from '../interfaces';
import { handleGetOrderInfo } from '../api';

interface IOrdersDrawer {
  invoiceItemsColumns?: ColumnsType<IInvoiceItemsData>;
}

const OrdersDrawer = ({ invoiceItemsColumns }: IOrdersDrawer) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>({});

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(`${searchParams}`);
  const selectedRow = params.get('selected-row');
  const activeTab = params.get('tab') ?? 'subscriptions';

  useEffect(() => {
    if (selectedRow) {
      setOpen(true);
      getOrderInfo(selectedRow);
    } else {
      setOrderInfo({});
    }
  }, [selectedRow, activeTab]);

  const getOrderInfo = async (id: string) => {
    setIsLoading(true);
    try {
      const orderInfo = await handleGetOrderInfo(id);
      setOrderInfo(orderInfo.data);
    } catch (error) {
      console.log(122, error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setOpen(false);
    params.delete('selected-row');

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const sums = orderInfo?.basket?.reduce(
    (acc: any, item: any) => {
      acc.totalExVatSum += item.totalExVat;
      acc.vatSum += item.vat;
      return acc;
    },
    { totalExVatSum: 0, vatSum: 0 }
  );

  return (
    <Drawer
      closeIcon={<CloseButton className='absolute right-5 top-5' />}
      placement='right'
      onClose={onClose}
      open={open}
      key={selectedRow}
      width={700}
      className='relative px-5 pt-14 custom-drawer'
    >
      {isLoading ? (
        <div className='flex justify-center items-center h-[90vh] pb-20'>
          <Spin size='large' className='custom-spin' />
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
            <div className='mt-6'>
              <Table
                columns={invoiceItemsColumns}
                dataSource={orderInfo.basket}
                pagination={false}
                className='custom-table-invoice borderless bg-white-1'
              />
              {orderInfo.basket?.length > 0 && (
                <div className='flex flex-col mt-8 ml-auto w-[185px] -mr-2.5'>
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-[10px] text-grey-5 font-semibold leading-[15px]'>
                      Subtotal
                    </p>
                    <h2 className='text-grey-2 text-xs font-bold font-gosha leading-[15px]'>
                      £{sums?.totalExVatSum}.00
                    </h2>
                  </div>
                  <hr className='border-0 border-t-[1px] border-grey-4 mt-2 mb-2.5' />
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-[10px] text-grey-5 font-semibold leading-[15px]'>
                      VAT
                    </p>
                    <h2 className='text-grey-2 text-xs font-bold font-gosha leading-[15px]'>
                      £{sums?.vatSum}.00
                    </h2>
                  </div>
                  <hr className='border-0 border-t-[1px] border-grey-4 mt-2' />
                  <div className='flex justify-between items-center w-full mt-6'>
                    <p className='text-sm text-grey-5 font-semibold leading-5'>
                      Total
                    </p>
                    <h2 className='text-grey-6 text-xl font-bold font-gosha leading-[15px]'>
                      £{sums?.totalExVatSum + sums?.vatSum}.00
                    </h2>
                  </div>
                  <hr className='border-0 border-t-[1px] border-grey-4 mt-2 mb-1' />
                  <hr className='border-0 border-t-[1px] border-grey-4' />
                </div>
              )}
              <div className='mt-5'>
                <p className='text-[9px] font-semibold leading-[9px]e text-grey-6'>
                  Postcode Collective LTD (Trading as Rabble)
                </p>
                <p className='text-[9px] font-semibold leading-[9px] text-grey-6'>
                  Company number: 14712713
                </p>
                <p className='text-[9px] text-grey-5 leading-[12px] mt-0.5'>
                  By accepting and fulfilling this order, you, the
                  &apos;Supplier,&apos; hereby agree to adhere to and are bound
                  by the delivery terms, payment terms, and product costs as
                  specified herein, in accordance with our self-billing
                  agreement and the terms of your existing contract with
                  Postcode Collective (trading as Rabble). Fulfillment of this
                  order constitutes your acceptance of these terms in their
                  entirety. Any discrepancies arising post-fulfillment regarding
                  unit costs, delivery, or payment terms will be resolved in
                  favor of the stipulated terms of this document and the
                  overarching agreement with Postcode Collective. All invoices
                  issued under this arrangement will comply with HMRC&apos;s
                  requirements for self-billed invoices, including necessary VAT
                  details.
                </p>
              </div>
            </div>
          </OrderDetailsBody>
          <OrderDetailsActions activeTab={activeTab} />
        </>
      )}
    </Drawer>
  );
};

export default OrdersDrawer;
