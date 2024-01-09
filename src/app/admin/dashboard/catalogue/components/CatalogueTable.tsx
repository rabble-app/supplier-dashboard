/** @format */

"use client";
import { useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ICatalogue } from "../interfaces";

interface ICatalogueTable {
  pageSize: number;
  columns?: ColumnsType<any>;
  data?: any;
  total: number;
  setRowsCount: (count: number) => void;
}

const data = [
  {
    key: 1,
    skuCode: "16821",
    imgSrc: "/images/image 33.png",
    title: "Espresso Blend Whole Bean",
    description: "1KG Ground for Filter",
    stock: 100,
    category: "Tea & Coffee",
    subCategory: "Coffee",
    sharedProducts: false,
    units: 1,
    wholesalePrice: 17.5,
    retailPrice: 30,
    vat: 0,
    unitOfMeasure: "KG",
    pricePerMeasure: 20,
  },
  {
    key: 2,
    skuCode: "29631",
    imgSrc: "/images/image 34.png",
    title: "6 Cacklebean Eggs",
    description: "Arlington White Cacklebean eggs.",
    stock: 100,
    category: "Farm & Dairy",
    subCategory: "Eggs",
    sharedProducts: true,
    units: 20,
    wholesalePrice: 1.75,
    retailPrice: 4,
    vat: 0,
    unitOfMeasure: "Case",
    pricePerMeasure: 2,
  },
];

const columns: ColumnsType<ICatalogue> = [
  {
    title: "Product image",
    dataIndex: "imgSrc",
    key: "imgSrc",
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
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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
        {text}
      </span>
    ),
  },
  {
    title: "Sub category",
    dataIndex: "subCategory",
    key: "subCategory",
    render: (text) => (
      <span className="bg-primary text-black leading-[18px] text-xs py-1 px-2 rounded-[100px]">
        {text}
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
  },
  {
    title: "Retail price",
    dataIndex: "retailPrice",
    key: "retailPrice",
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

const CatalogueTable = ({ pageSize, total, setRowsCount }: ICatalogueTable) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
      pagination={{
        position: ["bottomCenter"],
        pageSize,
        total,
        onChange: handlePaginationChange,
        current: Number(params.get("page")) || 1,
      }}
      className="mt-9 custom-table borderless overflow-scroll"
    />
  );
};

export default CatalogueTable;
