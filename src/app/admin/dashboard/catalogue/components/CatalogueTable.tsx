/** @format */

"use client";
import { useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ICatalogue } from "../interfaces";
import { truncateText } from "../util";

interface ICatalogueTable {
  pageSize: number;
  activeTab: string;
  columns?: ColumnsType<any>;
  data?: any;
  total: number;
  selectedRowKeys: React.Key[];
  setRowsCount: (count: number) => void;
  setSelectedRowKeys: (ids: React.Key[]) => void;
}

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
      <span className="bg-primary text-black leading-[18px] text-xs py-1 px-2 rounded-[100px]">
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
    render: (text) => <p>£{text}</p>,
  },
  {
    title: "Retail price",
    dataIndex: "retailPrice",
    key: "retailPrice",
    render: (text) => <p>£{text}</p>,
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

const CatalogueTable = ({
  pageSize,
  activeTab,
  total,
  setRowsCount,
  selectedRowKeys,
  setSelectedRowKeys,
  data,
}: ICatalogueTable) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handlePaginationChange = (page: number) => {
    params.set("page", page.toString());
    params.get("selected-row") && params.delete("selected-row");

    replace(`${pathname}?${params.toString()}`);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    setRowsCount(newSelectedRowKeys.length);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={activeTab === "pending-approval" ? rowSelection : undefined}
      pagination={{
        position: ["bottomCenter"],
        pageSize,
        total,
        onChange: handlePaginationChange,
        current: Number(params.get("page")) || 1,
        showSizeChanger: false,
      }}
      className="mt-9 custom-table borderless overflow-scroll"
    />
  );
};

export default CatalogueTable;
