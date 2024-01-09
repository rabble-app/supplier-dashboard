/** @format */
"use client";
import { message } from "antd";
import { useState } from "react";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import SearchInput from "@/components/SearchInput";
import Tabs from "@/components/Tabs";
import CatalogueTable from "./CatalogueTable";
import Button from "@/components/Button";

interface ICatalogueOverview {
  activeTab: string;
}

const CatalogueOverview = ({ activeTab }: ICatalogueOverview) => {
  const [rowsCount, setRowsCount] = useState(0);

  const tabItems = [
    {
      name: "pending-approval",
      quantity: 0,
    },
    {
      name: "approved-products",
      quantity: 0,
    },
  ];

  const handleActionClicked = (action: "approve" | "reject") => {
    if (action === "approve") {
      message.success({
        content: "SKU 18291 has been approved and will be live on RABBLE.",
        duration: 5,
        className: "absolute right-10 top-20 text-sm font-medium",
      });
    } else {
      message.error({
        content:
          "SKU 18291 has been rejected and will be sent back to suppliers draft.",
        duration: 5,
        className: "absolute right-10 top-20 text-sm font-medium",
      });
    }
  };

  return (
    <div className="pt-8">
      <PageHeader
        title="Products catalogue"
        subtitle="Keep track of products and their status."
        count={2}
        label="products"
      />
      <PageWrapper>
        <div className="flex justify-between items-center px-4 relative">
          <Tabs items={tabItems} activeTab={activeTab} />

          {rowsCount ? (
            <div className="absolute right-1/3 flex mr-5 gap-5">
              <Button
                label={`Approve Product${rowsCount > 1 ? "s" : ""}`}
                size="md"
                onClick={() => handleActionClicked("approve")}
              />
              <Button
                label={`Reject Product${rowsCount > 1 ? "s" : ""}`}
                size="md"
                variant="danger"
                onClick={() => handleActionClicked("reject")}
              />
            </div>
          ) : null}
          <div className="w-1/3">
            <SearchInput key={activeTab} placeholder="Search" />
          </div>
        </div>

        <CatalogueTable pageSize={7} total={20} setRowsCount={setRowsCount} />
      </PageWrapper>
    </div>
  );
};

export default CatalogueOverview;
