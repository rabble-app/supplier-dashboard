/** @format */
"use client";
import { useState } from "react";
import { Spin, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import SearchInput from "@/components/SearchInput";
import Tabs from "@/components/Tabs";
import CatalogueTable from "./CatalogueTable";
import Button from "@/components/Button";
import { handleApproveOrRejectCatalogue, handleGetCatalogue } from "../api";
import { getStatusByTab } from "../util";
import { ICatalogue } from "../interfaces";
import { truncateText } from "../util";
import { formatAmount } from "@/utils";

const columns: ColumnsType<ICatalogue> = [
  {
    title: "Product image",
    dataIndex: "imageUrl",
    key: "imageUrl",
    render: (imgSrc) => (
      <Image src={imgSrc} width={64} height={64} alt="product-img" className="rounded-lg" />
    ),
  },
  {
    title: "SKU code",
    dataIndex: "skuCode",
    key: "skuCode",
  },
  {
    title: "Title",
    dataIndex: "supplierName",
    key: "supplierName",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => (
      <p style={{ width: 250 }}>
        {text
          ? text?.length > 50
            ? `${truncateText(text, 10)}...`
            : text
          : "N/A"}
      </p>
    ),
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => (
      <span className="bg-primary text-black leading-[18px] text-xs py-1 px-2 rounded-[100px] whitespace-nowrap">
        {text || "N/A"}
      </span>
    ),
  },
  {
    title: "Sub category",
    dataIndex: "subCategory",
    key: "subCategory",
    render: (text) => (
      <span className="bg-primary text-black leading-[18px] text-xs py-1 px-2 rounded-[100px] whitespace-nowrap">
        {text || "N/A"}
      </span>
    ),
  },
  {
    title: "Shared products",
    dataIndex: "sharedProducts",
    key: "sharedProducts",
    render: (sharedProducts) => (sharedProducts ? "Yes" : "No"),
  },
  {
    title: "Units",
    dataIndex: "units",
    key: "units",
  },
  {
    title: "Wholesale price",
    dataIndex: "wholesalePrice",
    key: "wholesalePrice",
    render: (text) => <p>{formatAmount(text)}</p>,
  },
  {
    title: "Retail price",
    dataIndex: "retailPrice",
    key: "retailPrice",
    render: (text) => <p>{formatAmount(text)}</p>,
  },
  {
    title: "VAT",
    dataIndex: "vat",
    key: "vat",
  },
  {
    title: "Unit of measure",
    dataIndex: "unitOfMeasure",
    key: "unitOfMeasure",
  },
  {
    title: "Price/Measure",
    dataIndex: "pricePerMeasure",
    key: "pricePerMeasure",
  },
];

const CatalogueOverview = () => {
  const [rowsCount, setRowsCount] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isClicked, setIsClicked] = useState("");

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  const activeTab = searchParams.get("tab") || "pending-approval";

  const isClickedButton = (action: string) =>
    isActionLoading && isClicked === action;

  const status = getStatusByTab(activeTab);

  const { data: cataloguesData, isFetching } = useQuery({
    queryKey: ["catalogues", currentPage, query, status],
    queryFn: () => handleGetCatalogue(currentPage, query, status)
  });

  const tabItems = [
    {
      name: "pending-approval",
      quantity: 0,
    },
    {
      name: "approved-products",
      quantity: 0,
    },
    {
      name: "rejected-products",
      quantity: 0,
    },
  ];

  const handleActionClicked = (action: "APPROVED" | "REJECTED") => {
    setIsClicked(action);
    approveOrRejectCatalogue(selectedRowKeys, action);
  };

  const approveOrRejectCatalogue = async (
    ids: React.Key[],
    action: "APPROVED" | "REJECTED"
  ) => {
    setIsActionLoading(true);

    let content;

    if (action === "APPROVED") {
      content = "SKU 18291 has been approved and will be live on RABBLE.";
    } else {
      content =
        "SKU 18291 has been rejected and will be sent back to suppliers draft.";
    }

    try {
      const catalogueStatus = await handleApproveOrRejectCatalogue(ids, action);
      if (catalogueStatus.message.includes("error")) {
        return message.error(catalogueStatus.message);
      }

      message[`${action === "APPROVED" ? "success" : "error"}`]({
        content,
        duration: 5,
        className: "absolute right-10 top-20 text-sm font-medium",
      });
      setRowsCount(0);
      if (action === "APPROVED") {
        replace(`${pathname}?tab=approved-products`);
      } else {
        replace(`${pathname}?tab=rejected-products`);
      }
      setSelectedRowKeys([]);
    } catch (error) {
      console.log(122, error);
    } finally {
      setIsActionLoading(false);
    }
  };

  let locale = {
    emptyText: (
      <div className="py-[70px] text-center">
        <Image
          src="/images/Products.png"
          className="mx-auto"
          width={273}
          height={185}
          alt="no-data"
        />
        <div className="flex flex-col gap-2 mt-8">
          <h2 className="font-gosha font-bold text-[32px] leading-[38px] text-grey-6">
            No products
          </h2>
          <p className="leading-6 text-sm text-grey-5">
            It seems that you currently don&apos;t have any product. Add product
            so that Rabble users can buy
          </p>
        </div>
      </div>
    ),
  };


  return (
    <div className="pt-8">
      <PageHeader
        title="Products catalogue"
        subtitle="Keep track of products and their status."
        count={cataloguesData?.data?.[0]}
        label="products"
      />
      <PageWrapper>
        <div className="flex justify-between items-center px-4 relative">
          <Tabs
            items={tabItems}
            activeTab={activeTab}
            displayQuantity={false}
          />

          {rowsCount ? (
            <div className="absolute right-1/3 flex mr-5 gap-5">
              <Button
                label={
                  isClickedButton("APPROVED") ? (
                    <Spin />
                  ) : (
                    `Approve Product${rowsCount > 1 ? "s" : ""}`
                  )
                }
                size="md"
                onClick={() => handleActionClicked("APPROVED")}
              />
              {activeTab === "pending-approval" && (
                <Button
                  label={
                    isClickedButton("REJECTED") ? (
                      <Spin />
                    ) : (
                      `Reject Product${rowsCount > 1 ? "s" : ""}`
                    )
                  }
                  size="md"
                  variant="danger"
                  onClick={() => handleActionClicked("REJECTED")}
                />
              )}
            </div>
          ) : null}
          <div className="w-1/3">
            <SearchInput key={activeTab} placeholder="Search" />
          </div>
        </div>

        <CatalogueTable
          pageSize={7}
          activeTab={activeTab}
          total={cataloguesData?.data?.[0]}
          columns={columns}
          data={cataloguesData?.data?.[1]}
          setRowsCount={setRowsCount}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          rowSelectionTabs={["pending-approval","rejected-products"]}
          loading={isFetching}
          locale={locale}
        />
      </PageWrapper>
    </div>
  );
};

export default CatalogueOverview;
