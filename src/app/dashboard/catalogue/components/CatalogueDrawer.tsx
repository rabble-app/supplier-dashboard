/** @format */

"use client";
import { useState } from "react";
import { Drawer, Progress } from "antd";

import CloseButton from "@/components/CloseButton";
import Button from "@/components/Button";
import Image from "next/image";
import CloseIcon from "@/components/svgs/CloseIcon";
import InfoIcon from "@/components/svgs/InfoIcon";

interface ICatalogue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

  // TODO: This is a temporary code for Demo purposes only. It will be removed and replaced with the actual code.
const CatalogueDrawer = ({ open, setOpen }: ICatalogue) => {
  const [attachClicked, setAttachClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [uploadClicked, setUploadClicked] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      closeIcon={<CloseButton className="absolute right-5 top-5" />}
      placement="right"
      onClose={onClose}
      open={open}
      width={650}
      className="relative px-5 pt-14 custom-drawer"
    >
      <div className="flex flex-col justify-between items-center overflow-scroll h-[75%]">
        <div>
          <h1 className="font-gosha text-[32px] leading-10 mb-2">
            Upload catalogue
          </h1>
          <p className="text-sm leading-6 font-poppins text-grey-2 mb-10">
            Upload an excel or CSV that includes product codes, Product name,
            Product description, Stock amount, Shared product, Units in shared
            products, Wholesale price, Retail price, VAT%, Unit of measure,
            Price/Measure.
          </p>

          {!attachClicked && !cancelClicked ? (
            <div className="bg-white-1 rounded-lg border-[1px] border-grey-4 pb-6 pt-4">
              <div className="flex items-center justify-between px-6 ">
                <div>
                  <h3 className="text-grey-6 text-2xl font-gosha leading-7 mb-1">
                    Upload products
                  </h3>
                  <p className="text-grey-5 text-base leading-6 font-poppins font-medium">
                    You can select multiple files
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex justify-center items-center bg-black cursor-pointer"
                  onClick={() => setAttachClicked(true)}
                >
                  <Image
                    src="/images/icons/attach.svg"
                    width={24}
                    height={24}
                    alt="attach"
                  />
                </div>
              </div>

              <hr className="border-0 border-t-[1px] border-grey-4 my-4" />

              <div className="px-6">
                <p className="text-base leading-6 text-grey-2 font-medium mb-1">
                  Want to make your catalogue available faster?
                </p>
                <p className="text-grey-5 text-base leading-6 mb-4">
                  Download the template to format your catalogue correctly and
                  get your products in front of customer faster.
                </p>

                <p className="underline text-blue-1 flex text-base leading-6 cursor-pointer">
                  Template{" "}
                  <Image
                    src="/images/icons/arrow-line-down.svg"
                    width={24}
                    height={24}
                    alt="arrow line down"
                  />
                </p>
              </div>
            </div>
          ) : null}

          {attachClicked && !cancelClicked && !uploadClicked ? (
            <div className="bg-white-1 rounded-lg border-[1px] border-grey-4 pb-6 p-5  my-5 text-center flex flex-col justify-center items-center gap-4">
              <div>
                <Progress type="circle" percent={45} size={120} />
                <p className="leading-5 text-sm font-medium mt-2">
                  Uploading file...
                </p>
              </div>
              <Button
                label="Cancel"
                className="!leading-5 !py-2.5 !px-[40px] text-base bg-white-1 border-black border-[1.5px]"
                onClick={() => setCancelClicked(true)}
              />
            </div>
          ) : null}

          {cancelClicked && !uploadClicked ? (
            <>
              <div className="bg-white-1 rounded-lg border-[1px] border-grey-4 pb-6 p-5  my-5 text-center flex flex-col justify-center items-center gap-4 mb-4">
                <div>
                  <Progress
                    type="circle"
                    percent={45}
                    size={120}
                    status="exception"
                  />
                  <p className="leading-5 text-sm font-medium mt-2">
                    Error uploading file...
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="Try Again"
                    className="!leading-5 !py-2.5 !px-[40px] text-base bg-white-1 border-black border-[1.5px]"
                    onClick={() => {
                      setAttachClicked(false);
                      setCancelClicked(false);
                    }}
                  />
                  <Button
                    label="Upload New"
                    className="!leading-5 !py-2.5 !px-[40px] text-base"
                    onClick={() => {
                      setUploadClicked(true);
                      setCancelClicked(false);
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center border-[#ff1a35] border-[1px] rounded-lg p-4 bg-[#fff3f5] gap-2.5">
                <InfoIcon color="#ff1a35" size="24" />
                <p className="text-[#ff1a35] text-sm leading-5">
                  Product name too big
                </p>
                <CloseIcon color="#667085" size={8} />
              </div>
            </>
          ) : null}

          {uploadClicked ? (
            <>
              {" "}
              <div className="bg-white-1 rounded-lg border-[1px] border-grey-4 pb-6 pt-4  my-5">
                <div className="flex items-center justify-between px-6 ">
                  <div className="relative">
                    <h3 className="text-grey-6 text-2xl font-gosha leading-7 mb-1">
                      filename.csv
                    </h3>
                    <p className="text-grey-5 text-base leading-6 font-poppins font-medium">
                      15 MB
                    </p>
                    <div className="w-8 h-8 rounded-full flex justify-center items-center bg-black cursor-pointer absolute top-[10px] -right-12">
                      <Image
                        src="/images/icons/trash.svg"
                        width={16}
                        height={16}
                        alt="delete"
                      />
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black cursor-pointer">
                    <Image
                      src="/images/icons/attach.svg"
                      width={24}
                      height={24}
                      alt="attach"
                    />
                  </div>
                </div>

                <hr className="border-0 border-t-[1px] border-grey-4 my-6" />

                <div className="flex items-center justify-between px-6 ">
                  <div className="relative">
                    <h3 className="text-grey-6 text-2xl font-gosha leading-7 mb-1">
                      filename.csv
                    </h3>
                    <p className="text-grey-5 text-base leading-6 font-poppins font-medium">
                      15 MB
                    </p>
                    <div className="w-8 h-8 rounded-full flex justify-center items-center bg-black cursor-pointer absolute top-[10px] -right-12">
                      <Image
                        src="/images/icons/trash.svg"
                        width={16}
                        height={16}
                        alt="delete"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center border-blue-1 border-[1px] rounded-lg p-4 bg-[#F4F8FF] gap-2.5">
                <InfoIcon color="#0053f5" size="24" />
                <p className="text-blue-1 text-sm leading-5">
                  When products are upload they go into drafts and you must add
                  Product images, Category, and Sub category to send for
                  approval
                </p>
                <CloseIcon color="#667085" size={16} />
              </div>
            </>
          ) : null}
        </div>

       {uploadClicked? <div className="pb-10 absolute bottom-0 left-5 right-5">
          <Button
            label="Upload Products"
            className="text-2xl w-full"
            onClick={() => setOpen(false)}
          />
        </div>:null}
      </div>
    </Drawer>
  );
};

export default CatalogueDrawer;
