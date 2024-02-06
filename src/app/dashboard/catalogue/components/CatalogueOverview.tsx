/** @format */
"use client";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Dropdown, Space, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import type { UploadProps } from "antd";

import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import Tabs from "@/components/Tabs";
import SearchInput from "@/components/SearchInput";
import CatalogueTable from "@/app/admin/dashboard/catalogue/components/CatalogueTable";
import { formatAmount } from "@/utils";
import { truncateText } from "@/app/admin/dashboard/catalogue/util";
import { ICatalogue } from "@/app/admin/dashboard/catalogue/interfaces";
import Button from "@/components/Button";

const catalogueData = [
  {
    key: 1,
    imageUrl:
      "https://rabble-dev1.s3.us-east-2.amazonaws.com/products/image+29.png",
    skuCode: "SKU001",
    supplierName: "Supplier A",
    description: "Product description for SKU001",
    stock: 50,
    category: "Tea & Coffee",
    subCategory: "Coffee",
    sharedProducts: false,
    units: 10,
    wholesalePrice: 100.0,
    retailPrice: 150.0,
    vat: 10,
    unitOfMeasure: "KG",
    subUnitOfMeasure: 5,
    pricePerMeasure: "£ 20 / KG",
  },
  {
    key: 2,
    imageUrl:
      "https://rabble-dev1.s3.us-east-2.amazonaws.com/products/image+29.png",
    skuCode: "SKU002",
    supplierName: "Supplier B",
    description: "Product description for SKU001",
    stock: 50,
    category: "Farm & Dairy",
    subCategory: "Eggs",
    sharedProducts: false,
    units: 10,
    wholesalePrice: 100.0,
    retailPrice: 150.0,
    vat: 10,
    unitOfMeasure: "Case",
    subUnitOfMeasure: 12,
    pricePerMeasure: "£ 2 / Case",
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
  const [isClicked, setIsClicked] = useState("");
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

  const props: UploadProps = {
    name: "file",
    accept: ".png, .jpg, .jpeg",
    multiple: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    className: "upload-img"
  };

  const handleFilter = (term: string) => {
    console.log(term);
  };

  const columns: ColumnsType<ICatalogue> = [
    {
      title: "Product image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imgSrc) => (
        <>
          {activeTab == "draft" ? (
            <Dropdown
              dropdownRender={() => (
                <div className="w-[400px] h-[240px] border-[1px] border-grey-4 rounded-lg bg-white-1 p-2 mt-1.5 cursor-pointer">
                  <Dragger {...props}>
                    <div className="flex flex-col justify-center items-center pt-[50px]">
                    <Image
                      src="/images/icons/picture.svg"
                      width={24}
                      height={24}
                      alt="picture-img"
                    />
                    <div className="mt-4">
                      <p className="text-sm font-medium leading-5 text-black font-poppins">
                        <span className="text-blue-1">Click to upload</span> or
                        drag and drop image
                      </p>
                      <p className="text-grey-5 text-xs leading-4 font-poppins text-center mt-1">
                        800*800 required
                      </p>
                    </div>
                    </div>
                  </Dragger>
                </div>
              )}
              trigger={["click"]}
            >
              <div className="rounded-lg bg-[#d9d9d9] w-16 h-16 flex items-center justify-center cursor-pointer">
                <Image
                  src="/images/icons/add-circle.svg"
                  width={24}
                  height={24}
                  alt="product-img"
                  className="rounded-lg"
                />
              </div>
            </Dropdown>
          ) : (
            <Image
              src={imgSrc}
              width={64}
              height={64}
              alt="product-img"
              className="rounded-lg"
            />
          )}
        </>
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
        <p style={{ width: 150 }}>
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
        <>
          {activeTab === "draft" ? (
            <Dropdown
              dropdownRender={() => (
                <div className="w-[220px] h-[240px] border-[1px] border-grey-4 rounded-lg bg-white-1 p-2 mt-1.5">
                  <SearchInput
                    placeholder="Search category"
                    size="sm"
                    filter
                    handleFilter={handleFilter}
                  />
                  <ul className="mt-4">
                    {["Category 1", "Category 2", "Category 3"].map((item) => (
                      <li key={item} className="cursor-pointer flex flex-col">
                        <p className="text-xs font-medium leading-[18px] text-grey-5 font-poppins">
                          {item}
                        </p>
                        <hr className="border-t-[1px] border-grey-4 my-4" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              trigger={["click"]}
            >
              <div className="flex items-center justify-between bg-primary rounded-full px-2 gap-1.5 py-0.5 w-[80px] h-[22px] cursor-pointer z-10">
                <p className="text-grey-6 text-xs leading-[18px]">Select</p>
                <Image
                  src="/images/icons/arrow-down.svg"
                  width={14}
                  height={10}
                  alt="arrow-down"
                />
              </div>
            </Dropdown>
          ) : (
            <span className="bg-primary text-black leading-[18px] text-xs py-1 px-2 rounded-[100px] whitespace-nowrap">
              {text || "N/A"}
            </span>
          )}
        </>
      ),
    },
    {
      title: "Sub category",
      dataIndex: "subCategory",
      key: "subCategory",
      render: (text) => (
        <>
          {activeTab === "draft" ? (
            <Dropdown
              dropdownRender={() => (
                <div className="w-[220px] h-[240px] border-[1px] border-grey-4 rounded-lg bg-white-1 p-2 mt-1.5">
                  <SearchInput
                    placeholder="Search category"
                    size="sm"
                    filter
                    handleFilter={handleFilter}
                  />
                  <ul className="mt-4">
                    {["Category 1", "Category 2", "Category 3"].map((item) => (
                      <li key={item} className="cursor-pointer flex flex-col">
                        <p className="text-xs font-medium leading-[18px] text-grey-5 font-poppins">
                          {item}
                        </p>
                        <hr className="border-t-[1px] border-grey-4 my-4" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              trigger={["click"]}
            >
              <div className="flex items-center justify-between bg-primary rounded-full px-2 gap-1.5 py-0.5 w-[80px] h-[22px] cursor-pointer z-10">
                <p className="text-grey-6 text-xs leading-[18px]">Select</p>
                <Image
                  src="/images/icons/arrow-down.svg"
                  width={14}
                  height={10}
                  alt="arrow-down"
                />
              </div>
            </Dropdown>
          ) : (
            <span className="bg-primary text-black leading-[18px] text-xs py-1 px-2 rounded-[100px] whitespace-nowrap">
              {text || "N/A"}
            </span>
          )}
        </>
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
      render: (text) => (
        <>
          {activeTab === "draft" ? (
            <Dropdown
              dropdownRender={() => (
                <div className="w-[220px] border-[1px] border-grey-4 rounded-lg bg-white-1 p-2 mt-1.5">
                  <SearchInput
                    placeholder="Search category"
                    size="sm"
                    filter
                    handleFilter={handleFilter}
                  />
                  <ul className="mt-4 h-[240px] overflow-scroll">
                    {[
                      "Category 1",
                      "Category 2",
                      "Category 3",
                      "Category 1",
                      "Category 2",
                      "Category 3",
                    ].map((item) => (
                      <li key={item} className="cursor-pointer flex flex-col">
                        <p className="text-xs font-medium leading-[18px] text-grey-5 font-poppins">
                          {item}
                        </p>
                        <hr className="border-t-[1px] border-grey-4 my-4" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              trigger={["click"]}
            >
              <div className="flex items-center justify-between bg-primary rounded-full px-2 gap-1.5 py-0.5 w-[80px] h-[22px] cursor-pointer z-10">
                <p className="text-grey-6 text-xs leading-[18px]">Select</p>
                <Image
                  src="/images/icons/arrow-down.svg"
                  width={14}
                  height={10}
                  alt="arrow-down"
                />
              </div>
            </Dropdown>
          ) : (
            <span className="bg-primary text-black leading-[18px] text-xs py-1 px-2 rounded-[100px] whitespace-nowrap">
              {text || "N/A"}
            </span>
          )}
        </>
      ),
    },
    // {
    //   title: "Sub Unit of measure",
    //   dataIndex: "subUnitOfMeasure",
    //   key: "subUnitOfMeasure",
    // },
    {
      title: "Price/Measure",
      dataIndex: "pricePerMeasure",
      key: "pricePerMeasure",
      render: (text) => {
        return (
          <>
         {activeTab==="draft"? <div className="relative catalogue-input w-[155px] border-[1px] rounded-[4px] border-grey-4 bg-white overflow-hidden">
            <i className="absolute left-2 top-1">£</i>
            <input
              className="border-l-0 h-[30px] w-[60px] pl-5 focus:outline-none placeholder:font-normal"
              type="number"
              placeholder="Price"
            />
            <div className="absolute right-2 top-1 bg-white">
              <i>/</i>
              <span className="text-[12px] font-poppins font-medium">
                &nbsp;Selected UOM
              </span>
            </div>
          </div>: text}
          </>

        );
      },
    },
    ...(activeTab !== "draft"
      ? [
          {
            title: " ",
            key: "",
            render: () => (
              <Space size="middle" onClick={(e) => e.stopPropagation()}>
                <Dropdown>
                  <Image
                    src="/images/icons/more.svg"
                    width={24}
                    height={24}
                    alt="more-icon"
                    className="pointer-events-none"
                  />
                </Dropdown>
              </Space>
            ),
          },
        ]
      : []),
  ];

  const handleActionClicked = (action: "APPROVED" | "REJECTED") => {
    setIsClicked(action);
  };

  let data;

  if (activeTab === "active") {
    data = [];
  } else if (activeTab === "pending-approval") {
    data = catalogueData;
  } else if (activeTab === "draft") {
    data = catalogueData;
  }

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
          {rowsCount ? 
            <div className="absolute right-1/3 flex mr-5 gap-5">
              <Button
                label="Send for Approval"          
                size="md"
                onClick={() => handleActionClicked("APPROVED")}
              />
              </div>
              :null
              }
          <div className="w-1/3">
            <SearchInput key={activeTab} placeholder="Search" />
          </div>
        </div>

        <CatalogueTable
          pageSize={7}
          activeTab={activeTab}
          total={0}
          data={data}
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
