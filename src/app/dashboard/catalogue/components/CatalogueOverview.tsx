/** @format */
"use client";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import Tabs from "@/components/Tabs";
import SearchInput from "@/components/SearchInput";
import CatalogueTable from "@/app/admin/dashboard/catalogue/components/CatalogueTable";
import { formatAmount } from "@/utils";
import { truncateText } from "@/app/admin/dashboard/catalogue/util";
import { ICatalogue } from "@/app/admin/dashboard/catalogue/interfaces";

const columns: ColumnsType<ICatalogue> = [
  {
    title: "Product image",
    dataIndex: "imageUrl",
    key: "imageUrl",
    render: (imgSrc) => (
      <Image src={imgSrc} width={64} height={64} alt="product-img" />
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

const tabItems = [
  {
    name: "active",
    quantity: 0,
  },
  {
    name: "pending-approval",
    quantity: 0,
  },
  {
    name: "draft",
    quantity: 0,
  },
];

const CatalogueOverview = () => {
  const [rowsCount, setRowsCount] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "active";

  let locale = {
    emptyText: (
      <div className="py-[70px] text-center">
        <Image
          src="/images/Shopping.png"
          className="mx-auto"
          width={273}
          height={185}
          alt="no-data"
        />
        <div className="flex flex-col gap-2 mt-8">
          <h2 className="font-gosha font-bold text-[32px] leading-[38px] text-grey-6">No products</h2>
          <p className="leading-6 text-sm text-grey-5">It seems that you currently don&apos;t have any product. Add product so that Rabble users can buy</p>
        </div>
      </div>
    ),
  };

  return (
    <div className="pt-8 relative">
      <PageHeader
        title="Products catalogue"
        subtitle="Keep track of products and their status."
        count={0}
        label="products"
      />
      <button className="bg-primary font-gosha absolute flex items-center gap-2.5 h-[60px] top-8 right-0 py-5 px-[14px] font-bold text-base text-center rounded-full cursor-pointer">
        <Image
          src="/images/icons/add-circle.svg"
          width={32}
          height={32}
          alt="Add a New Product"
        />{" "}
        Add a New Product
      </button>
      <PageWrapper>
        <div className="flex justify-between items-center px-4 relative">
          <Tabs
            items={tabItems}
            activeTab={activeTab}
            displayQuantity={false}
          />
          <div className="w-1/3">
            <SearchInput key={activeTab} placeholder="Search" />
          </div>
        </div>

        <CatalogueTable
          pageSize={7}
          activeTab={activeTab}
          total={0}
          data={[]}
          columns={columns}
          setRowsCount={setRowsCount}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          rowSelectionTabs={["draft"]}
          loading={false}   
          locale={locale}
        />
      </PageWrapper>
    </div>
  );
};

export default CatalogueOverview;
