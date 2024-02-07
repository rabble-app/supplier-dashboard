/** @format */

"use client";
import { useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface ICatalogueTable {
  pageSize: number;
  activeTab: string;
  columns: ColumnsType<any>;
  data?: any;
  total: number;
  selectedRowKeys: React.Key[];
  setRowsCount: (count: number) => void;
  setSelectedRowKeys: (ids: React.Key[]) => void;
  loading: boolean;
  rowSelectionTabs?: string[];
  locale?: any;
}

const CatalogueTable = ({
  pageSize,
  activeTab,
  total,
  setRowsCount,
  selectedRowKeys,
  setSelectedRowKeys,
  data,
  columns,
  loading,
  rowSelectionTabs,
  locale
}: ICatalogueTable) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(`${searchParams}`);

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
      locale={locale}
      columns={columns}
      dataSource={data}
      rowSelection={
        rowSelectionTabs?.includes(activeTab) ? rowSelection : undefined
      }
      loading={loading}
      pagination={{
        position: ["bottomCenter"],
        pageSize,
        total,
        onChange: handlePaginationChange,
        current: Number(params.get("page")) || 1,
        showSizeChanger: false,
      }}
      className="mt-9 custom-table borderless overflow-x-scroll"
    />
  );
};

export default CatalogueTable;
